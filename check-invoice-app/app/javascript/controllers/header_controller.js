import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("HeaderController connected");
  }

  navigate(event) {
    event.preventDefault();
    const url = event.currentTarget.getAttribute("href");
    Turbo.visit(url);
  }
}
