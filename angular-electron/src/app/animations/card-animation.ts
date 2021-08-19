import { animate, state, style, transition, trigger } from "@angular/animations";

export let cardAnimation = trigger('cardAnimation', [
    state('open', style({
        transform: 'scale(1)'
    })),
    state('close', style({
        transform: 'scale(0)'
    })),
    transition('close => open', animate('500ms ease-in')),
    transition('open => close', animate('500ms ease-out'))
])