export class PageState {
  public loading: boolean = false;

  public error: string | null = null;

  startLoading() {
    this.loading = true;
  }

  finishLoading() {
    this.loading = false;
  }

  catchError(value: string) {
    this.error = value;
  }
}
