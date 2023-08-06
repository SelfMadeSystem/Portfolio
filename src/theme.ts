export type Theme = {
    frontName: string;
    isNeon: boolean;
}

// Frontend name -> Backend name (css class applied to body)
export const THEMES = {
    "light": {
        frontName: "Light",
        isNeon: false,
    },
    "dark": {
        frontName: "Dark",
        isNeon: true,
    },
    // for now, that's it
};

export type Themes = keyof typeof THEMES;

export const THEME_NAMES: Themes[] = Object.keys(THEMES) as Themes[];

export function getTheme(): Themes {
    return document.body.classList[0] as Themes;
}

export function isNeon(): boolean {
    return THEMES[getTheme()].isNeon;
}

export function setTheme(theme: Themes) {
    document.body.classList.remove(getTheme());
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
}

export function initTheme() {
    const theme = localStorage.getItem("theme");
    if (theme != null) {
        setTheme(theme as Themes);
    }
}

initTheme();
