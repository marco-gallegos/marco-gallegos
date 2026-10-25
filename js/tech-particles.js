(function () {
  "use strict";

  var LOGO_DIR = "img/techs/";
  var GUARANTEED = ["linux-tux.svg", "ubuntu.svg"];
  var LOGOS = GUARANTEED.concat([
    "python.svg",
    "javascript.svg",
    "vue.svg",
    "react.svg",
    "laravel.svg",
    "php.svg",
    "nodejs.svg",
    "gopher.svg",
    "java.svg",
    "csharp.svg",
    "docker.svg",
    "mysql.svg",
    "postgresql.svg",
    "mongodb.svg",
    "redis.svg",
    "hadoop.svg",
    "awss3.svg",
    "github.svg",
    "bootstrap.svg",
    "flutter.svg",
    "raspberry.svg",
    "arduino.svg",
    "deno.svg",
    "angular.svg",
    "ionic.svg",
    "sqlite.svg",
    "mssql.svg",
    "c-plusplus.svg",
  ]);

  function shuffle(items) {
    for (var i = items.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = items[i];
      items[i] = items[j];
      items[j] = tmp;
    }
    return items;
  }

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function init(container) {
    var canvas = document.createElement("canvas");
    canvas.className = "tech-particles";
    canvas.setAttribute("aria-hidden", "true");
    container.insertBefore(canvas, container.firstChild);

    var ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    var images = {};
    var particles = [];
    var width = 0;
    var height = 0;
    var frame = null;
    var resizeFrame = null;
    var visible = true;
    var reduceMotion = window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function loadImages() {
      LOGOS.forEach(function (filename) {
        var image = new Image();
        image.onload = function () {
          images[filename] = image;
          if (reduceMotion) {
            drawFrame();
          }
        };
        image.src = LOGO_DIR + filename;
      });
    }

    function buildParticles() {
      var shuffled = shuffle(LOGOS.slice());
      var count = Math.max(6, Math.min(22, Math.round(width * height / 38000)));
      if (width < 576) {
        count = Math.min(count, 9);
      }

      var isMobile = width < 576;
      var baseSize = isMobile ? 18 : 28;
      var sizeSpread = isMobile ? 8 : 20;
      var safeTop = isMobile ? 80 : 90;

      particles = [];
      for (var i = 0; i < count; i++) {
        var size = randomBetween(baseSize, baseSize + sizeSpread);
        var radius = size * 0.95;
        var minX = radius;
        var maxX = Math.max(minX + 1, width - radius);
        var minY = safeTop + radius;
        var maxY = Math.max(minY + 1, height - radius);
        var x = randomBetween(minX, maxX);
        var y = randomBetween(minY, maxY);

        for (var attempt = 0; attempt < 30; attempt++) {
          var overlaps = false;
          for (var j = 0; j < particles.length; j++) {
            var other = particles[j];
            var dx = x - other.x;
            var dy = y - other.y;
            var clearance = (radius + other.radius) * 0.95;
            if (dx * dx + dy * dy < clearance * clearance) {
              overlaps = true;
              break;
            }
          }

          if (!overlaps) {
            break;
          }

          x = randomBetween(minX, maxX);
          y = randomBetween(minY, maxY);
        }

        particles.push({
          x: x,
          y: y,
          vx: randomBetween(-0.22, 0.22) || 0.12,
          vy: randomBetween(-0.22, 0.22) || -0.12,
          size: size,
          radius: radius,
          minX: minX,
          maxX: maxX,
          minY: minY,
          maxY: maxY,
          rotation: randomBetween(0, Math.PI * 2),
          spin: randomBetween(-0.0015, 0.0015),
          alpha: isMobile ? randomBetween(0.55, 0.8) : randomBetween(0.8, 1),
          logo: i < GUARANTEED.length
            ? GUARANTEED[i]
            : shuffled[(i - GUARANTEED.length) % shuffled.length],
        });
      }
    }

    function update() {
      particles.forEach(function (particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.spin;

        if (particle.x < particle.minX) {
          particle.x = particle.minX;
          particle.vx = Math.abs(particle.vx);
        } else if (particle.x > particle.maxX) {
          particle.x = particle.maxX;
          particle.vx = -Math.abs(particle.vx);
        }

        if (particle.y < particle.minY) {
          particle.y = particle.minY;
          particle.vy = Math.abs(particle.vy);
        } else if (particle.y > particle.maxY) {
          particle.y = particle.maxY;
          particle.vy = -Math.abs(particle.vy);
        }
      });
    }

    function drawConnections() {
      var maxDistance = width < 576 ? 80 : 140;
      var lineAlpha = width < 576 ? 0.1 : 0.14;

      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "rgba(255, 255, 255, "
              + ((1 - distance / maxDistance) * lineAlpha).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    function drawParticle(particle) {
      var image = images[particle.logo];
      var radius = particle.radius;

      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.globalAlpha = particle.alpha;

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 6;
      ctx.fillStyle = "rgba(255, 255, 255, 0.93)";
      ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
      ctx.stroke();

      if (image) {
        var logoWidth = particle.size * 1.2;
        var logoHeight = particle.size * 1.2;

        if (image.naturalWidth && image.naturalHeight) {
          var ratio = image.naturalWidth / image.naturalHeight;
          if (ratio > 1) {
            logoHeight = logoWidth / ratio;
          } else {
            logoWidth = logoHeight * ratio;
          }
        }

        ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 0;
        ctx.drawImage(image, -logoWidth / 2, -logoHeight / 2, logoWidth, logoHeight);
      }

      ctx.restore();
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);
      drawConnections();
      particles.forEach(drawParticle);
    }

    function loop() {
      frame = null;
      if (!visible || document.hidden) {
        return;
      }

      update();
      drawFrame();
      frame = window.requestAnimationFrame(loop);
    }

    function start() {
      if (reduceMotion) {
        drawFrame();
        return;
      }
      if (frame === null && visible && !document.hidden) {
        frame = window.requestAnimationFrame(loop);
      }
    }

    function stop() {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    }

    function resize() {
      var rect = container.getBoundingClientRect();
      var nextWidth = Math.max(1, Math.round(rect.width));
      var nextHeight = Math.max(1, Math.round(rect.height));

      if (nextWidth === width && nextHeight === height) {
        return;
      }

      width = nextWidth;
      height = nextHeight;

      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildParticles();

      if (reduceMotion) {
        drawFrame();
      } else {
        start();
      }
    }

    function scheduleResize() {
      if (resizeFrame !== null) {
        return;
      }
      resizeFrame = window.requestAnimationFrame(function () {
        resizeFrame = null;
        resize();
      });
    }

    loadImages();

    if ("ResizeObserver" in window) {
      new ResizeObserver(scheduleResize).observe(container);
    } else {
      window.addEventListener("resize", scheduleResize);
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) {
          start();
        } else {
          stop();
        }
      }, { threshold: 0 }).observe(container);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });

    resize();
  }

  document.querySelectorAll("[data-tech-particles]").forEach(init);
})();
