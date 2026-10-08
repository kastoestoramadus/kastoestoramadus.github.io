(function () {
  'use strict';

  var navigation = document.querySelector('.post-language-switch');
  if (!navigation) return;

  var links = Array.from(navigation.querySelectorAll('a'));
  var sections = links.map(function (link) {
    return document.getElementById(link.hash.slice(1));
  });
  // Leave the anchor-only fallback intact if a translation is missing.
  if (sections.some(function (section) { return !section; })) return;

  var heading = document.querySelector('#post h1 strong');
  var originalTitle = document.title;
  var englishTitle = links[0].dataset.postTitle;

  function selectLanguage() {
    var fragment;
    try {
      fragment = decodeURIComponent(window.location.hash.slice(1));
    } catch (error) {
      fragment = '';
    }
    if (fragment === 'wersja-polska') fragment = 'polski';
    var target = document.getElementById(fragment);
    var selected = target && target.closest('.post-language');
    if (sections.indexOf(selected) === -1) selected = sections[0];

    sections.forEach(function (section, index) {
      var active = section === selected;
      section.hidden = !active;
      if (active) links[index].setAttribute('aria-current', 'true');
      else links[index].removeAttribute('aria-current');
      if (active) {
        var title = links[index].dataset.postTitle || englishTitle;
        if (heading) {
          heading.textContent = title;
          heading.lang = section.lang;
        }
        document.title = originalTitle.replace(englishTitle, title);
      }
    });
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (window.location.hash !== link.hash) window.history.pushState(null, '', link.hash);
      selectLanguage();
      window.requestAnimationFrame(function () {
        navigation.scrollIntoView({ block: 'start' });
      });
    });
  });

  window.addEventListener('hashchange', selectLanguage);
  window.addEventListener('popstate', selectLanguage);
  selectLanguage();
  // Language links select a version of the whole post, including its title.
  // Prevent the browser's initial anchor jump from hiding the switch above it.
  if (['#english', '#polski', '#wersja-polska'].indexOf(window.location.hash) !== -1) {
    window.addEventListener('load', function () {
      window.requestAnimationFrame(function () {
        navigation.scrollIntoView({ block: 'start' });
      });
    }, { once: true });
  }
}());
