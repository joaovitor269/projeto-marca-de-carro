// Boas práticas: respeitar "prefers-reduced-motion" e conexões com economia de dados.
    (function() {
      const video = document.getElementById('bgVideo');
      const hero = document.getElementById('hero');

      // Se usuário prefere menos movimento, não iniciar o vídeo
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Se conexão do usuário declarou save-data (ex: celular com economia)
      const saveData = navigator.connection && navigator.connection.saveData;

      // Opcional: desabilitar se a largura for pequena (mobile)
      const isSmallScreen = window.innerWidth < 768;

      if (prefersReducedMotion || saveData || isSmallScreen) {
        // remove o elemento vídeo e usa background image como fallback
        if (video) {
          video.remove();
        }
        hero.classList.add('hero--no-video');
        // definir uma imagem de fundo de fallback (pode ser poster.jpg)
        hero.style.backgroundImage = "url('poster.jpg')";
      } else {
        // garantir autoplay silencioso em alguns navegadores
        if (video) {
          video.muted = true;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // autoplay bloqueado: remove o vídeo e usa poster
              video.remove();
              hero.classList.add('hero--no-video');
              hero.style.backgroundImage = "url('poster.jpg')";
            });
          }
        }
      }
    })();