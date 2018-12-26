
export interface KeybindOptions {
  preventInput?: boolean;
  stopPropagation?: boolean;
  preventDefault?: boolean;
}

// Meant to be used with @HostListener('document:keydown', ['$event']).
// Automatically ignores events from input fields, stops propagation, and prevents
// default behaviour.
// TODO: would be nice to wrap HostListener and be done with it.
export function Keybind(opts?: KeybindOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    opts = { preventInput: true, stopPropagation: true, preventDefault: true, ...opts };
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      if (arguments[0] && arguments[0] instanceof KeyboardEvent) {
        const event: KeyboardEvent = arguments[0];
        // Ignore events from inputs.
        if (opts.preventInput && isEventFromInput(event)) { return; }
        // Prevent event propagation.
        if (opts.preventInput) { event.stopPropagation(); }
        // Also prevent default behaviour.
        if (opts.preventDefault) { event.preventDefault(); }
      }
      return originalMethod.apply(this, arguments);
    };
    return descriptor;
  };
}

// From https://www.bennadel.com/blog/3382-handling-global-keyboard-shortcuts-using-priority-and-terminality-in-angular-5-0-5.htm
export function isEventFromInput(event: KeyboardEvent): boolean {
  if (event.target instanceof Node) {
    switch (event.target.nodeName) {
      case 'INPUT':
      case 'SELECT':
      case 'TEXTAREA':
        return (true);
      default:
        return false;
    }
  }

  return false;
}
