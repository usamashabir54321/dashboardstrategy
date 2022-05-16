import { setCookies } from 'cookies-next';

export const changeTheme = (themeMode) => {
    if (themeMode == 'd_dark') {
        setCookies('themeMode', 'd_light');
        return {
            type: 'LIGHT_THEME',
            payload: 'd_light'
        }
    }
    else {
        setCookies('themeMode', 'd_dark');
        return {
            type: 'DARK_THEME',
            payload: 'd_dark'
        }
    }
}


export const setTheme = (themeMode) => {
    return {
        type: 'LIGHT_THEME',
        payload: themeMode
    }
}