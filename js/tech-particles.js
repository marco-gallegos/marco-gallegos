(function () {
  "use strict";

  var LOGO_DIR = "img/techs/";
  var LOGOS = [
    { file: "linux-tux.svg", name: "Linux", url: "https://www.linux.org/" },
    { file: "ubuntu.svg", name: "Ubuntu", url: "https://ubuntu.com/" },
    { file: "bohr-atom.svg", name: "Bohr model", url: "https://en.wikipedia.org/wiki/Bohr_model" },
    { file: "python.svg", name: "Python", url: "https://www.python.org/" },
    { file: "javascript.svg", name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { file: "vue.svg", name: "Vue", url: "https://vuejs.org/" },
    { file: "react.svg", name: "React", url: "https://react.dev/" },
    { file: "laravel.svg", name: "Laravel", url: "https://laravel.com/" },
    { file: "php.svg", name: "PHP", url: "https://www.php.net/" },
    { file: "nodejs.svg", name: "Node.js", url: "https://nodejs.org/" },
    { file: "gopher.svg", name: "Go", url: "https://go.dev/" },
    { file: "java.svg", name: "Java", url: "https://www.java.com/" },
    { file: "csharp.svg", name: "C#", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
    { file: "docker.svg", name: "Docker", url: "https://www.docker.com/" },
    { file: "mysql.svg", name: "MySQL", url: "https://www.mysql.com/" },
    { file: "postgresql.svg", name: "PostgreSQL", url: "https://www.postgresql.org/" },
    { file: "mongodb.svg", name: "MongoDB", url: "https://www.mongodb.com/" },
    { file: "redis.svg", name: "Redis", url: "https://redis.io/" },
    { file: "hadoop.svg", name: "Hadoop", url: "https://hadoop.apache.org/" },
    { file: "awss3.svg", name: "AWS S3", url: "https://aws.amazon.com/s3/" },
    { file: "github.svg", name: "GitHub", url: "https://github.com/" },
    { file: "bootstrap.svg", name: "Bootstrap", url: "https://getbootstrap.com/" },
    { file: "flutter.svg", name: "Flutter", url: "https://flutter.dev/" },
    { file: "raspberry.svg", name: "Raspberry Pi", url: "https://www.raspberrypi.org/" },
    { file: "arduino.svg", name: "Arduino", url: "https://www.arduino.cc/" },
    { file: "deno.svg", name: "Deno", url: "https://deno.com/" },
    { file: "angular.svg", name: "Angular", url: "https://angular.dev/" },
    { file: "ionic.svg", name: "Ionic", url: "https://ionicframework.com/" },
    { file: "sqlite.svg", name: "SQLite", url: "https://www.sqlite.org/" },
    { file: "mssql.svg", name: "SQL Server", url: "https://www.microsoft.com/en-us/sql-server" },
    { file: "c-plusplus.svg", name: "C++", url: "https://isocpp.org/" },
  ];
  var GUARANTEED = ["linux-tux.svg", "ubuntu.svg", "bohr-atom.svg"];
  var LOGO_BY_FILE = {};

  LOGOS.forEach(function (logo) {
    LOGO_BY_FILE[logo.file] = logo;
  });

  var GUARANTEED_LOGOS = GUARANTEED.map(function (filename) {
    return LOGO_BY_FILE[filename];
  }).filter(Boolean);

  var RANDOM_LOGOS = LOGOS.filter(function (logo) {
    return GUARANTEED.indexOf(logo.file) === -1;
  });

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

    var linkLayer = document.createElement("div");
    linkLayer.className = "tech-particles-links";
    linkLayer.setAttribute("role", "group");
    linkLayer.setAttribute("aria-label", "Technologies");
    container.insertBefore(linkLayer, canvas.nextSibling);

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
      LOGOS.forEach(function (logo) {
        var image = new Image();
        image.onload = function () {
          images[logo.file] = image;
          if (reduceMotion) {
            drawFrame();
          }
        };
        image.src = LOGO_DIR + logo.file;
      });
    }

    function positionLink(particle) {
      if (!particle.link) {
        return;
      }

      particle.link.style.transform = "translate3d("
        + (particle.x - particle.hitSize / 2) + "px,"
        + (particle.y - particle.hitSize / 2) + "px,0)";
    }

    function setHovered(particle, hovered) {
      particle.hovered = hovered;
      if (reduceMotion) {
        drawFrame();
      }
    }

    function createLinks() {
      linkLayer.innerHTML = "";

      particles.forEach(function (particle) {
        var link = document.createElement("a");
        link.className = "tech-particle-link";
        link.href = particle.logo.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.title = particle.logo.name;
        link.setAttribute("aria-label", particle.logo.name + " (opens in a new tab)");

        particle.hitSize = Math.max(particle.radius * 2, 40);
        particle.link = link;
        link.style.width = particle.hitSize + "px";
        link.style.height = particle.hitSize + "px";

        link.addEventListener("mouseenter", function () {
          setHovered(particle, true);
        });
        link.addEventListener("mouseleave", function () {
          setHovered(particle, false);
        });
        link.addEventListener("focus", function () {
          setHovered(particle, true);
        });
        link.addEventListener("blur", function () {
          setHovered(particle, false);
        });

        positionLink(particle);
        linkLayer.appendChild(link);
      });
    }

    function buildParticles() {
      var shuffled = shuffle(RANDOM_LOGOS.slice());
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
          hovered: false,
          logo: i < GUARANTEED_LOGOS.length
            ? GUARANTEED_LOGOS[i]
            : shuffled[(i - GUARANTEED_LOGOS.length) % shuffled.length],
        });
      }

      createLinks();
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

        positionLink(particle);
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
      var image = images[particle.logo.file];
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

      if (particle.hovered) {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(0, 0, radius + 5, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
        ctx.lineWidth = 2;
        ctx.stroke();
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
