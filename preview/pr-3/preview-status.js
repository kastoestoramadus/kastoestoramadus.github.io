(function () {
  'use strict';
  var badge = document.getElementById('preview-status');
  if (!badge) return;
  var status = document.getElementById('preview-freshness');
  var refresh = document.getElementById('preview-refresh');
  var build = document.querySelector('meta[name="preview-build"]').content;
  var busy = false;
  var lastCheck = 0;

  function freshURL() {
    var url = new URL(location.href);
    url.searchParams.set('preview', Date.now().toString());
    return url;
  }

  refresh.hidden = false;
  refresh.addEventListener('click', function () { location.replace(freshURL()); });

  async function check() {
    if (busy) return;
    busy = true;
    lastCheck = Date.now();
    status.textContent = 'Checking latest version…';
    try {
      // A fresh request also checks HTML when the browser restored an old page.
      var response = await fetch(freshURL(), { cache: 'no-store', signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error('Preview unavailable');
      var html = new DOMParser().parseFromString(await response.text(), 'text/html');
      var latest = html.querySelector('meta[name="preview-build"]');
      if (!latest) throw new Error('Missing revision');
      if (latest.content !== build) {
        // Guard against a CDN returning alternating deployments.
        var key = 'preview-refreshed-' + location.pathname + '-' + build;
        if (!sessionStorage.getItem(key)) {
          sessionStorage.setItem(key, '1');
          location.replace(freshURL());
          return;
        }
        status.textContent = 'A newer preview is available. Refresh to load it.';
        return;
      }
      var repository = badge.dataset.repository;
      if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) {
        status.textContent = 'Local preview; latest PR commit not checked.';
        return;
      }
      var api = 'https://api.github.com/repos/' + repository + '/pulls/' + badge.dataset.pr;
      response = await fetch(api, { cache: 'no-store', signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error('GitHub unavailable');
      var pr = await response.json();
      if (!pr.head || !pr.head.sha) throw new Error('Missing PR commit');
      status.textContent = pr.head.sha === badge.dataset.revision
        ? 'Latest PR version.'
        : 'Newer commit in PR; this preview is still on an older revision.';
    } catch (error) {
      status.textContent = 'Could not verify latest version. Try Refresh preview.';
    } finally {
      busy = false;
    }
  }

  check();
  window.addEventListener('pageshow', function (event) { if (event.persisted) check(); });
  window.addEventListener('focus', function () { if (Date.now() - lastCheck > 60000) check(); });
}());
