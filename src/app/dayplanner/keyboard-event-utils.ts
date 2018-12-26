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
