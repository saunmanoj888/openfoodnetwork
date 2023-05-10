import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["form"];

  connect() {
    this.#setup();
  }

  changePage(event) {
    this.page.value = event.target.dataset.page;
    this.submitSearch();
    this.page.value = 1;
  }

  changePerPage(event) {
    this.per_page.value = parseInt(event.target.value);
    this.submitSearch();
  }

  changeSorting(event) {
    let current = event.target.dataset.current;
    let column = event.target.dataset.column;

    this.sort.value = current === `${column} asc` ? `${column} desc` : `${column} asc`;

    this.submitSearch();
  }

  submitSearch() {
    this.form.requestSubmit();
  }

  reset() {
    this.clearForm();
    this.submitSearch();
  }

  clearForm() {
    this.form.reset();
    this.#clearCustomElements();
    if (this.page) this.page.value = 1;
    if (this.sort) this.sort.value = this.sort.dataset.default;
  }

  // private

  #setup() {
    if (this.hasFormTarget) {
      this.form = this.formTarget;
      this.form.controller = this;
    } else {
      this.form = document.querySelector("form[data-search-target=form]");
    }

    this.page = this.form.querySelector(".page");
    this.per_page = this.form.querySelector(".per-page");
    this.sort = this.form.querySelector(".sort");
  }

  #clearCustomElements() {
    window.dispatchEvent(new CustomEvent("flatpickr:clear"));

    this.form.querySelectorAll(".tomselected").forEach((select) => {
      select.tomselect?.clear();
    });
  }
}
