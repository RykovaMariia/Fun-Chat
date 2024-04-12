import { Observable } from 'Services/observable';

class PageService {
  private isAuthenticated = new Observable<boolean>(false);

  getAuthenticatedStatus() {
    return this.isAuthenticated.getValue();
  }
}

export const pageService = new PageService();
