export class PageState {
  public loading = false;

  public error = null;

  startLoading() {
    this.loading = true;
  }

  finishLoading() {
    this.loading = false;
  }

  catchError(value: any) {
    this.error = value;
  }
}
