function waitsForReadyState() {
  waitsFor(function() {
    return this.controller.state === 'ready';
  }, 'ready state');
}
