const dialog = document.querySelector('#sala-video');
const video = dialog.querySelector('video');
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-video]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      dialog.showModal();
      video.play().catch(() => {});
    });
  });
  document.querySelector('#cerrar').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => video.pause());
}
const scenes = {
  arena: ['Vista elevada de las plataformas y barreras luminosas de El Acuario', 'La arena elevada y su plataforma central.'],
  portador: ['Distintivo luminoso sobre la cabeza de Shady', 'La Marca delata al portador ante los demás concursantes.'],
  duelo: ['Shady con la escopeta frente a Miku en la plataforma central', 'Mordida y Cardumen en un duelo a corta distancia.']
};
const controls = document.querySelector('.switches');
controls.hidden = false;
controls.addEventListener('click', event => {
  const button = event.target.closest('button[data-scene]');
  if (!button) return;
  const key = button.dataset.scene;
  const [alt, caption] = scenes[key];
  const picture = document.querySelector('#vista');
  picture.src = key + '.webp';
  picture.alt = alt;
  document.querySelector('#pie').textContent = caption;
  for (const option of controls.querySelectorAll('button')) option.setAttribute('aria-pressed', String(option === button));
});
