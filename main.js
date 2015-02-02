// Pour ne pas polluer le scope global
$(function () {
    var numParticles = 150;
    var particles = new Array(numParticles);
    var stageWidth = $(document).innerWidth();
    var stageHeight = $(document).innerHeight();
    var frameRate = 24 / 1000;

    init();

    function init() {
        initParticles();
        addParticlesToDOM();
        setInterval(update, frameRate);
    }

    function update() {
        for (var i = 0; i < numParticles; i++) {
            var particle = particles[i];
            particle.transform();
            particle.limitToStage();
            particle.move();
            particle.updateView();
        }
    }

    function initParticles() {

        var html = '<div class="particle"></div>';

        for (var i = 0; i < numParticles; i++) {
            var $particle = $(html);
            var position = getInitialPositionAt(i);
            var size = getInitialSizeAt(i);

            particles[i] = new Particle({
                $element: $particle,
                x: position.x,
                y: position.y,
                width: size.width,
                height: size.height,
                alpha: getInitialAlphaAt(i)
            });
        }
    }

    function addParticlesToDOM() {
        var $container = $('#container').detach();

        for (var i = 0; i < numParticles; i++) {
            var $particle = particles[i].$element;
            $container.append($particle);
        }

        $('body').append($container);
    }

    function getInitialPositionAt(i) {
        return {
            x: Math.random() * 500,
            y: Math.random() * 500
        };
    }

    function getInitialSizeAt(i) {
        return {
            width: (Math.random() * i) / 9 + 10,
            height: (Math.random() * i) / 16 + 10
        };
    }

    function getInitialAlphaAt(i) {
        return Math.random();
    }

    function Particle(params) {
        params = params || {};
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.animationSpeed = params.animationSpeed || 1;
        this.width = params.width || 5;
        this.height = params.height || 5;
        this.alpha = params.alpha || 1;
        this.$element = params.$element || null;
    }

    Particle.prototype.transform = function () {
        this.width += Math.random() * ((Math.round(Math.random()) * -1) || 1);
        this.height = this.width;
        this.alpha = Math.max(0, Math.min(1, this.alpha + Math.random() * frameRate * 0.05 * ((Math.round(Math.random()) * -1) || 1)));

    };

    Particle.prototype.move = function () {
        this.ax = Math.random() * 0.05 * ((Math.round(Math.random()) * -1) || 1);
        this.ay = Math.random() * 0.05 * ((Math.round(Math.random()) * -1) || 1);
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
        this.vy *= 0.97;
        this.vx *= 0.97;
    };

    Particle.prototype.updateView = function () {
        this.$element.css({
            top: this.y,
            left: this.x,
            width: this.width + 'px',
            height: this.height + 'px',
            opacity: this.alpha
        });
    };

    Particle.prototype.regulate = function () {
        this.vx *= frameRate * this.animationSpeed;
        this.vy *= frameRate * this.animationSpeed;
        this.ax *= frameRate * this.animationSpeed;
        this.ay *= frameRate * this.animationSpeed;
        this.width *= frameRate * this.animationSpeed;
        this.height *= frameRate * this.animationSpeed;
        this.x *= frameRate * this.animationSpeed;
        this.y *= frameRate * this.animationSpeed;
        this.alpha *= frameRate * this.animationSpeed;
    };

    Particle.prototype.limitToStage = function () {
        if (this.x >= stageWidth - this.width * 2) {
            this.x = stageWidth - this.width * 2;
            this.ax *= -1;
        } else if (this.x <= 0) {
            this.x = 0;
            this.ax *= -1;
        }

        if (this.y >= stageHeight - this.height) {
            this.y = stageHeight - this.height;
            this.ay *= -1;
        } else if (this.y <= 0) {
            this.y = 0;
            this.ay *= -1;
        }
    };

});
