class Controls {
  constructor(type) {
    this.forward = false;
    this.right = false;
    this.left = false;
    this.reverse = false;

    switch (type) {
      case "KEYS":
        this.#addKeyboardListener();
        break;
      case "DUMMY":
        this.forward = true;
        break;
    }
  }
  #addKeyboardListener() {
    //on key up
    document.onkeydown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
      }
    };
    //onkeyup
    document.onkeyup = (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
      }
    };
  }
}
