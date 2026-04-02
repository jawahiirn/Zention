import localFont from 'next/font/local'

export const lexend = localFont({
    src: [
        {
            path: '../assets/fonts/Lexend/Lexend-Thin.ttf',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Lexend/Lexend-ExtraLight.ttf',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Lexend/Lexend-Light.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Lexend/Lexend-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Lexend/Lexend-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Lexend/Lexend-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Lexend/Lexend-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Lexend/Lexend-ExtraBold.ttf',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Lexend/Lexend-Black.ttf',
            weight: '900',
            style: 'normal',
        },

    ],
    variable: '--font-lexend',
    display: 'swap',
})

export const quicksand = localFont({
    src: [
        {
            path: '../assets/fonts/Quicksand/Quicksand-Light.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Quicksand/Quicksand-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Quicksand/Quicksand-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Quicksand/Quicksand-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Quicksand/Quicksand-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-quicksand',
    display: 'swap',
})