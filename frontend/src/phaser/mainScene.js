import Phaser from 'phaser';
import { saveGameScore } from './offlineDB.js';

  // --- Constants ---
    const GAME_WIDTH = 1280;
    const GAME_HEIGHT = 720;
    const GROUND_Y = 670;
    const LAUNCH_X = 80;
    const LAUNCH_Y = GROUND_Y - 30;

    // --- Level Configuration ---
    const LEVELS = [
        { // Level 1: Static Target
            name: "Static Target",
            targetPos: { x: 1100, y: GROUND_Y - 40 },
            gravity: 350,
            timeLimit: 6,
        },
        { // Level 2: Moving Target
            name: "Moving Target",
            targetPos: { x: 900, y: GROUND_Y - 40 },
            targetVelocity: { x: -80, y: 0 },
            gravity: 350,
            timeLimit: 12,
        },
        { // Level 3: Moon Gravity
            name: "Moon Mission (Gravity: 60)",
            targetPos: { x: 1150, y: GROUND_Y - 40 },
            gravity: 60,
            timeLimit: 12,
        },
        { // Level 4: Obstacle
            name: "Clear the Wall",
            targetPos: { x: 1100, y: GROUND_Y - 40 },
            obstacle: { x: 640, y: GROUND_Y - 150, width: 40, height: 300 },
            gravity: 350,
            timeLimit: 8,
        },
        { // Level 5: Wind
            name: "Crosswind Challenge",
            targetPos: { x: 1000, y: GROUND_Y - 40 },
            wind: { x: -30, y: 0 }, // Pushes left
            gravity: 350,
            timeLimit: 6,
        }
    ];

    class AdvancedPhysicsScene extends Phaser.Scene {
        constructor() {
            super({ key: 'AdvancedPhysicsScene' });
        }

        // --- Core Phaser Methods ---

        preload() {
            // Create dynamic textures for particles
            const particleGraphics = this.make.graphics();
            particleGraphics.fillStyle(0xffffff, 1);
            particleGraphics.fillCircle(4, 4, 4);
            particleGraphics.generateTexture('particle-white', 8, 8);
            
            particleGraphics.clear();
            particleGraphics.fillStyle(0xffd700, 1);
            particleGraphics.fillCircle(5,5,5);
            particleGraphics.generateTexture('particle-gold', 10, 10);
            particleGraphics.destroy();

            // Create sky gradient texture via canvas as a fallback
            const gradCanvas = this.textures.createCanvas('skyGradient', GAME_WIDTH, GAME_HEIGHT);
            if (gradCanvas) {
                const context = gradCanvas.getContext();
                const gradient = context.createLinearGradient(0, 0, 0, GAME_HEIGHT);
                gradient.addColorStop(0, '#87CEEB');
                gradient.addColorStop(1, '#E0F2FF');
                context.fillStyle = gradient;
                context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                gradCanvas.refresh();
            }
        }

        create() {
            this.gameState = {
                currentLevel: 0,
                totalScore: 0,
                attemptsThisLevel: 0,
                isLaunched: false,
                isLevelOver: false
            };
            
            this.createBackground();
            this.createGameObjects();
            this.createUI();
            this.createEmitters();
            this.setupPhysics();
            
            this.setupLevel(this.gameState.currentLevel);
        }

        update(time, delta) {
            if (this.gameState.isLaunched) {
                this.updateProjectile(delta);
            }
            if (this.levelConfig.targetVelocity) {
                this.updateMovingTarget();
            }
        }
        
        // --- Setup Methods ---

        setupLevel(levelIndex) {
    this.levelConfig = LEVELS[levelIndex];
    this.gameState.attemptsThisLevel = 0;
    this.gameState.isLevelOver = false;

    // Reset UI and game state
    this.levelTitle.setText(`Level ${levelIndex + 1}: ${this.levelConfig.name}`);
    this.updateScoreDisplay();
    this.hintText.setText('');
    this.clearResultsUI();

    // Configure physics
    this.physics.world.gravity.y = this.levelConfig.gravity;

    // Reset projectile
    this.resetProjectile();

    // Configure target
    this.target.setPosition(this.levelConfig.targetPos.x, this.levelConfig.targetPos.y);
    this.target.body.setVelocity(0, 0);
    if (this.levelConfig.targetVelocity) {
        this.target.body.setVelocity(this.levelConfig.targetVelocity.x, this.levelConfig.targetVelocity.y);
    }

    // Configure obstacle
    this.obstacle.setVisible(false);
    this.obstacle.body.enable = false;   // ✅ FIXED

    if (this.levelConfig.obstacle) {
        const obs = this.levelConfig.obstacle;
        this.obstacle
            .setPosition(obs.x, obs.y)
            .setSize(obs.width, obs.height)
            .setVisible(true);
        this.obstacle.body.enable = true;   // ✅ FIXED
    }

    // Configure wind display
    this.windIndicator.setVisible(false);
    if (this.levelConfig.wind) {
        this.windIndicator.setVisible(true).setText(`Wind: < ${-this.levelConfig.wind.x}`);
    }

    this.updateAndDrawTrajectory();
}

        
        createBackground() {
            this.add.image(0, 0, 'skyGradient').setOrigin(0);
            this.add.rectangle(0, GROUND_Y, GAME_WIDTH, GAME_HEIGHT - GROUND_Y, 0x98D885).setOrigin(0);
        }

        createGameObjects() {
            // Launcher base
            this.add.rectangle(LAUNCH_X, GROUND_Y - 15, 60, 30, 0x555555).setStrokeStyle(2, 0x333333);
            
            // Projectile
            this.projectile = this.add.circle(LAUNCH_X, LAUNCH_Y, 12, 0xFF4136).setStrokeStyle(2, 0xB62F27);
            
            // Target
            this.target = this.add.rectangle(0, 0, 80, 80, 0x3D9970).setStrokeStyle(4, 0x2E7254);
            
            // Obstacle Wall
            this.obstacle = this.add.rectangle(0, 0, 1, 1, 0x8B4513).setStrokeStyle(4, 0x5D2906);
            
            // Trajectory Graphics
            this.trajectoryLine = this.add.graphics();
        }

        createUI() {
            // --- DOM Elements for Input ---
            this.angleSlider = this.createSlider(120, 45, 1, 89, (value) => this.angleValue.setText(`${value}°`));
            this.speedSlider = this.createSlider(120, 85, 200, 1500, (value) => this.speedValue.setText(value));
            this.launchButton = this.createButton(120, 140, 'LAUNCH', this.launchProjectile);

            // --- Phaser Text & Panels ---
            const topPanel = this.add.rectangle(0, 0, GAME_WIDTH, 50, 0x000000, 0.3).setOrigin(0);
            this.levelTitle = this.add.text(GAME_WIDTH / 2, 25, '', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
            this.scoreText = this.add.text(20, 25, '', { fontSize: '24px', fill: '#fff' }).setOrigin(0, 0.5);
            
            // --- Learning Panel ---
            const panelX = 1080;
            const panelY = 80;
            const panelW = 180;
            const panelH = 220;
            this.add.rectangle(panelX, panelY, panelW, panelH, 0x000000, 0.3).setOrigin(0);
            this.add.text(panelX + panelW / 2, panelY + 15, 'Calculations', { fontSize: '18px', fill: '#fff' }).setOrigin(0.5);
            
            // Theoretical values
            this.add.text(panelX + 10, panelY + 45, 'Max Height:', { fill: '#aaa' });
            this.add.text(panelX + 10, panelY + 75, 'Time of Flight:', { fill: '#aaa' });
            this.add.text(panelX + 10, panelY + 105, 'Range:', { fill: '#aaa' });
            this.theoryHeightText = this.add.text(panelX + panelW - 10, panelY + 45, '', { fill: '#fff' }).setOrigin(1, 0);
            this.theoryTimeText = this.add.text(panelX + panelW - 10, panelY + 75, '', { fill: '#fff' }).setOrigin(1, 0);
            this.theoryRangeText = this.add.text(panelX + panelW - 10, panelY + 105, '', { fill: '#fff' }).setOrigin(1, 0);

            // Actual values
            this.add.line(panelX, panelY + 135, 0, 0, panelW, 0, 0xaaaaaa, 0.5).setOrigin(0);
            this.add.text(panelX + 10, panelY + 145, 'Actual Height:', { fill: '#aaa' });
            this.add.text(panelX + 10, panelY + 175, 'Actual Range:', { fill: '#aaa' });
            this.actualHeightText = this.add.text(panelX + panelW - 10, panelY + 145, '', { fill: '#66ff66' }).setOrigin(1, 0);
            this.actualRangeText = this.add.text(panelX + panelW - 10, panelY + 175, '', { fill: '#66ff66' }).setOrigin(1, 0);

            this.hintText = this.add.text(GAME_WIDTH / 2, 80, '', { fontSize: '24px', fill: '#ffcc00' }).setOrigin(0.5);
            this.windIndicator = this.add.text(GAME_WIDTH / 2, 50, '', {fontSize: '20px', fill: '#fff'}).setOrigin(0.5);
        }

        createEmitters() {
            this.hitEmitter = this.add.particles(0, 0, 'particle-gold', {
                speed: { min: 100, max: 400 }, angle: { min: 0, max: 360 },
                scale: { start: 1, end: 0 }, lifespan: 600,
                gravityY: 400, blendMode: 'ADD', emitting: false
            });

            this.trailEmitter = this.add.particles(0, 0, 'particle-white', {
                speed: 10, scale: { start: 0.5, end: 0 },
                lifespan: 500, blendMode: 'ADD', emitting: false
            });
            this.trailEmitter.startFollow(this.projectile);
        }

        setupPhysics() {
            this.physics.world.setBounds(0, 0, GAME_WIDTH, GROUND_Y);

            this.physics.add.existing(this.target);
            this.target.body.setImmovable(true).setAllowGravity(false);

            this.physics.add.existing(this.projectile);
            this.projectile.body.setCircle(12).setCollideWorldBounds(true).setBounce(0.5);
            
            this.physics.add.existing(this.obstacle, true); // Static

            this.physics.add.collider(this.projectile, this.obstacle, this.hitObstacle, null, this);
            this.physics.add.overlap(this.projectile, this.target, this.handleHit, null, this);
        }
        
        shutdown() {
            // Clean up DOM elements on scene restart to prevent duplicates
            if (this.angleSlider) {
                this.angleSlider.remove();
            }
            if (this.speedSlider) {
                this.speedSlider.remove();
            }
        }

        // --- Game Logic ---
        
        launchProjectile() {
            if (this.gameState.isLaunched || this.gameState.isLevelOver) return;

            this.gameState.isLaunched = true;
            this.gameState.attemptsThisLevel++;
            this.clearResultsUI();
            this.hintText.setText('');
            this.trajectoryLine.clear();
            this.trailEmitter.emitting = true;

            this.projectile.body.setEnable(true);
            const angleDeg = this.angleSlider.value;
            const speed = this.speedSlider.value;
            this.physics.velocityFromAngle(-angleDeg, speed, this.projectile.body.velocity);

            // Record launch data for analysis
            this.launchData = {
                startTime: this.time.now,
                maxHeight: LAUNCH_Y,
                hitObstacle: false
            };
        }

        updateProjectile(delta) {
    // Existing wind + height tracking
    if (this.levelConfig.wind) {
        this.projectile.body.velocity.x += this.levelConfig.wind.x * (delta / 1000);
    }
    if (this.projectile.y < this.launchData.maxHeight) {
        this.launchData.maxHeight = this.projectile.y;
    }

    // Time-based miss check
    const elapsed = (this.time.now - this.launchData.startTime) / 1000; // in seconds
    if (elapsed > this.levelConfig.timeLimit){
        this.handleMiss();
        return;
    }

    // Ground stop miss check
    const hasStopped = this.projectile.body.onFloor() && Math.abs(this.projectile.body.velocity.x) < 1;
    if (hasStopped) {
        this.handleMiss();
    }
}
        
        updateMovingTarget() {
            if (this.target.x < 800 && this.target.body.velocity.x < 0) {
                this.target.body.velocity.x *= -1;
            }
            if (this.target.x > GAME_WIDTH - 80 && this.target.body.velocity.x > 0) {
                 this.target.body.velocity.x *= -1;
            }
        }

        handleHit() {
    if (this.gameState.isLevelOver) return;
    this.gameState.isLevelOver = true;
    this.gameState.isLaunched = false;

    // Particles + effects
    this.hitEmitter.setPosition(this.target.x, this.target.y).explode(40);
    this.trailEmitter.emitting = false;
    this.projectile.body.setEnable(false).setVelocity(0);
    this.projectile.setVisible(false);

    // Stars & points
    const stars = Math.max(1, 4 - this.gameState.attemptsThisLevel);
    const scoreGained = 10;
    this.gameState.totalScore += scoreGained;
    this.updateScoreDisplay();

    // ✅ FIXED: Save score to IndexedDB (no import() needed here)
    saveGameScore({
        level: this.gameState.currentLevel + 1,
        score: scoreGained,
        stars: stars
    }).then(() => {
        console.log("Score saved for offline sync!");
    }).catch(error => {
        console.error("Failed to save score:", error);
    });

    this.showEndLevelScreen(true, stars, scoreGained);
}

        hitObstacle() {
            if (!this.launchData) return;
            this.launchData.hitObstacle = true;
        }
        
        handleMiss() {
            this.gameState.isLaunched = false;
            this.trailEmitter.emitting = false;
            
            this.displayActualResults();
            this.generateHint();
            
            this.time.delayedCall(2000, this.resetProjectile, [], this);
        }

        resetProjectile() {
            this.projectile.setPosition(LAUNCH_X, LAUNCH_Y).setVisible(true);
            this.projectile.body.setEnable(false).setVelocity(0);
            this.updateAndDrawTrajectory();
        }

        // --- UI & Helper Methods ---
        
        updateAndDrawTrajectory() {
            if (this.gameState.isLaunched || this.gameState.isLevelOver) return;
            const data = this.calculateTrajectoryData();
            this.updateTheoryUI(data);
            this.drawTrajectory(data);
        }

        calculateTrajectoryData() {
            const v = this.speedSlider.value;
            const angleRad = Phaser.Math.DegToRad(this.angleSlider.value);
            const g = this.levelConfig.gravity;

            // Note: These formulas assume launch and land at same height (y=0),
            // which is a good approximation for educational purposes.
            const time = (2 * v * Math.sin(angleRad)) / g;
            const range = (v * v * Math.sin(2 * angleRad)) / g;
            const height = (v * v * Math.sin(angleRad) * Math.sin(angleRad)) / (2 * g);
            
            return { time, range, height, v, angleRad, g };
        }

        drawTrajectory({v, angleRad, g}) {
            this.trajectoryLine.clear().lineStyle(4, 0xffffff, 0.6);
            const startX = this.projectile.x;
            const startY = this.projectile.y;

            const velX = v * Math.cos(angleRad);
            const velY = -v * Math.sin(angleRad);

            this.trajectoryLine.beginPath().moveTo(startX, startY);
            for (let t = 0.1; t < 10; t += 0.1) {
                const x = startX + velX * t;
                const y = startY + velY * t + 0.5 * g * t * t;
                if (y > GROUND_Y || x > GAME_WIDTH) break;
                this.trajectoryLine.lineTo(x, y);
            }
            this.trajectoryLine.strokePath();
        }

        updateTheoryUI({time, range, height}) {
            this.theoryHeightText.setText(`${height.toFixed(1)} m`);
            this.theoryTimeText.setText(`${time.toFixed(2)} s`);
            this.theoryRangeText.setText(`${range.toFixed(1)} m`);
        }

        displayActualResults() {
            const actualHeight = LAUNCH_Y - this.launchData.maxHeight;
            const actualRange = this.projectile.x - LAUNCH_X;
            this.actualHeightText.setText(`${actualHeight.toFixed(1)} m`);
            this.actualRangeText.setText(`${actualRange.toFixed(1)} m`);
        }
        
        clearResultsUI() {
            this.actualHeightText.setText('');
            this.actualRangeText.setText('');
        }
        
        updateScoreDisplay() {
            this.scoreText.setText(`Score: ${this.gameState.totalScore}`);
        }

        generateHint() {
            const missDistance = this.projectile.x - this.target.x;
            let hint = "";
            if (this.levelConfig.obstacle && this.launchData.hitObstacle) {
                hint = "Hint: Try a higher launch angle to clear the wall.";
            } else if (missDistance < -50) { // Undershot
                hint = "Hint: You undershot! Try increasing speed or angle.";
            } else if (missDistance > 50) { // Overshot
                hint = "Hint: You overshot! Try decreasing your launch speed.";
            } else {
                hint = "Hint: So close! A small adjustment should do it.";
            }
            this.hintText.setText(hint);
        }
        
        showEndLevelScreen(isWin, stars, score) {
            const bgColor = isWin ? 0x000000 : 0x550000;
            const titleText = isWin ? `Level ${this.gameState.currentLevel + 1} Cleared!` : 'Game Over';
            
            const container = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT / 2).setAlpha(0);
            const bg = this.add.rectangle(0, 0, 600, 400, bgColor, 0.8).setStrokeStyle(2, 0xffffff);
            const title = this.add.text(0, -150, titleText, { fontSize: '48px' }).setOrigin(0.5);
            container.add([bg, title]);

            if (isWin) {
                const scoreDisplay = this.add.text(0, -80, `Score Gained: +${score}`, { fontSize: '32px' }).setOrigin(0.5);
                container.add(scoreDisplay);
                
                // Draw stars
                for (let i = 0; i < 3; i++) {
                    const starColor = i < stars ? 0xFFD700 : 0x555555;
                    const star = this.add.star(-80 + i * 80, -20, 5, 20, 40, starColor);
                    container.add(star);
                }
            }
            
            const isLastLevel = this.gameState.currentLevel >= LEVELS.length - 1;
            const buttonText = isWin ? (isLastLevel ? 'Finish Game' : 'Next Level') : 'Restart Game';
            const nextButton = this.createButton(0, 120, buttonText, () => {
                container.destroy();
                if (isWin) {
                    if (isLastLevel) {
                        this.showWinScreen();
                    } else {
                        this.gameState.currentLevel++;
                        this.setupLevel(this.gameState.currentLevel);
                    }
                } else {
                    this.scene.restart();
                }
            }, container);

            this.tweens.add({ targets: container, alpha: 1, duration: 500 });
        }
        
        showWinScreen() {
             const container = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT / 2).setAlpha(0);
            const bg = this.add.rectangle(0, 0, 600, 400, 0x003366, 0.9).setStrokeStyle(2, 0xffffff);
            const title = this.add.text(0, -100, 'Congratulations!', { fontSize: '52px', fill: '#FFD700' }).setOrigin(0.5);
            const scoreDisplay = this.add.text(0, 0, `Total Score: ${this.gameState.totalScore}`, { fontSize: '42px' }).setOrigin(0.5);
            container.add([bg, title, scoreDisplay]);
            this.createButton(0, 120, 'Play Again', () => this.scene.restart(), container);
            this.tweens.add({ targets: container, alpha: 1, duration: 500 });
        }
        
        // --- DOM Element Creation ---
        createSlider(x, y, min, max, callback) {
            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = min;
            slider.max = max;
            slider.value = (parseInt(min) + parseInt(max)) / 2;
            Object.assign(slider.style, {
                position: 'absolute', top: `${y}px`, left: `${x}px`, width: '200px', cursor: 'pointer'
            });
            this.add.dom(0, 0, slider); // Add to game
            slider.addEventListener('input', () => {
                callback(slider.value);
                this.updateAndDrawTrajectory();
            });

            const labelText = this.add.text(x-70, y+5, (y < 80 ? 'Angle:' : 'Speed:'), {fontSize:'18px'}).setOrigin(0,0.5);
            const valueText = this.add.text(x+220, y+5, slider.value + (y < 80 ? '°' : ''), {fontSize:'18px', fontStyle:'bold'}).setOrigin(0, 0.5);

            if (y < 80) this.angleValue = valueText;
            else this.speedValue = valueText;

            return slider;
        }

        createButton(x, y, text, callback, container = null) {
            const button = this.add.text(x, y, text, {
                fontSize: '24px', fill: '#000', backgroundColor: '#fff',
                padding: { x: 20, y: 10 },
                borderRadius: '5px'
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            button.on('pointerdown', () => {
                button.setScale(0.95);
                callback.call(this);
            });
            button.on('pointerup', () => button.setScale(1));
            button.on('pointerout', () => button.setScale(1));
            
            if(container) container.add(button);
            return button;
        }
    }

    export default AdvancedPhysicsScene;
