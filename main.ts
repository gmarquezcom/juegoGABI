let velocidadExplosion = 0
let aumentarVelocidadCada = 0
let puntuacion = 0
let velocidad = 0
let vivo = 0
let posicion = 0
let linea = 0
let hueco = 0
function Explosion () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . # . .
        `)
    basic.pause(velocidadExplosion)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . # . .
        . # . # .
        `)
    basic.pause(velocidadExplosion)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . # . # .
        # . # . #
        `)
    basic.pause(velocidadExplosion)
    basic.showLeds(`
        . . . . .
        . . # . .
        . # . # .
        # . # . #
        . # . # .
        `)
    basic.pause(velocidadExplosion)
    basic.showLeds(`
        . . # . .
        . # . # .
        # . # . #
        . # . # .
        # . # . #
        `)
    basic.pause(velocidadExplosion)
    basic.showLeds(`
        . # . # .
        # . # . #
        . # . # .
        # . # . #
        . # . # .
        `)
    basic.pause(velocidadExplosion)
    basic.showLeds(`
        # . # . #
        . # . # .
        # . # . #
        . # . # .
        # . . . #
        `)
    basic.pause(velocidadExplosion)
    basic.showLeds(`
        . # . # .
        # . # . #
        . # . # .
        # . . . #
        . . . . .
        `)
    basic.pause(velocidadExplosion)
    basic.showLeds(`
        # . # . #
        . # . # .
        # . . . #
        . . . . .
        . . . . .
        `)
    basic.pause(velocidadExplosion)
    basic.showLeds(`
        . # . # .
        # . . . #
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(velocidadExplosion)
    basic.showLeds(`
        # . . . #
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
/**
 * Pulsar A+B para comenzar
 */
function Iniciar () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    aumentarVelocidadCada = 1
    puntuacion = 0
    velocidad = 1000
    vivo = 1
    posicion = 2
    linea = 0
    velocidadExplosion = 10
    led.plot(posicion, 4)
}
function EvaluaSiToca () {
    if (posicion != hueco) {
        Explosion()
        vivo = 0
        basic.showNumber(puntuacion)
    } else {
        led.unplot(0, 4)
        led.unplot(1, 4)
        led.unplot(2, 4)
        led.unplot(3, 4)
        led.unplot(4, 4)
        led.plot(posicion, 4)
        puntuacion = puntuacion + 1
    }
}
input.onButtonPressed(Button.A, function () {
    if (vivo == 1) {
        MueveIzquierda()
    } else {
        basic.showString("Pulsa A+B")
    }
})
function MueveDerecha () {
    if (posicion < 4) {
        led.unplot(posicion, 4)
        posicion = posicion + 1
        led.plot(posicion, 4)
    }
}
input.onButtonPressed(Button.AB, function () {
    Iniciar()
    while (vivo == 1) {
        AvanzaPared()
        basic.pause(velocidad)
        if (linea == 4) {
            EvaluaSiToca()
            linea = 0
            AumentaVelocidad()
        } else {
            linea = linea + 1
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (vivo == 1) {
        MueveDerecha()
    } else {
        basic.showString("Pulsa A+B")
    }
})
function MueveIzquierda () {
    if (posicion > 0) {
        led.unplot(posicion, 4)
        posicion = posicion - 1
        led.plot(posicion, 4)
    }
}
function AumentaVelocidad () {
    if (puntuacion % aumentarVelocidadCada == 0) {
        velocidad = velocidad - 100
    }
}
function AvanzaPared () {
    if (linea == 0) {
        hueco = randint(0, 4)
    }
    OcultaLineaAnterior()
    for (let index = 0; index <= 4; index++) {
        if (index != hueco) {
            led.plot(index, linea)
        }
    }
}
function OcultaLineaAnterior () {
    led.unplot(0, linea - 1)
    led.unplot(1, linea - 1)
    led.unplot(2, linea - 1)
    led.unplot(3, linea - 1)
    led.unplot(4, linea - 1)
}
