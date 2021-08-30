import { animate, state, style, transition, trigger } from "@angular/animations";

export let cardAnimation = trigger('cardAnimation', [
    state('open', style({
        height: '*',
        
    })),
    state('close', style({
        overflow: 'hidden',
        height: '0px',
        width: '0px'
    })),
    transition('close => open', animate('500ms ease-in')),
    transition('open => close', animate('500ms ease-out'))
])