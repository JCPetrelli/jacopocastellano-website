// Click-to-play YouTube embeds: show a still until the visitor clicks,
// then swap in the player (no YouTube title bar before playing, lighter page).
// Markup: <button class="yt-facade" data-yt="VIDEO_ID" data-title="..."><img src="..." alt="..."></button>
export function initYtFacades(root: ParentNode = document) {
  root.querySelectorAll<HTMLButtonElement>('.yt-facade[data-yt]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.yt}?autoplay=1&rel=0&playsinline=1`;
      iframe.title = btn.dataset.title ?? '';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.className = 'yt-facade-player';
      btn.replaceWith(iframe);
    }, { once: true });
  });
}
