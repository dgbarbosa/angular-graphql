import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { setContext } from 'apollo-link-context';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ){
    const http = httpLink.create({ uri: '" https://api.github.com/graphql' });
    
    const auth = setContext((_,{ headers }) => {
      const token = 'ce4069acde15fbc0ac069d61fe4d9f93b30b86bc';
      if(!token){
        console.log('a');
        return{}
      }else{
        return{
          headers: headers.append('Authorization', 'Bearer ${token}')
        };
      }
    });
    // const auth = setContext((_, { headers }) => {
    //   const token = ' ce4069acde15fbc0ac069d61fe4d9f93b30b86bc';
    //   if (!token) {

    //     console.log('a');
    //     return {}
    //   } else {
    //     console.log('a');
    //     return {
    //       headers: headers.append('Authorization', 'Bearer ${token}')
    //     };
    //   }
    // });
    // console.log(auth);

    apollo.create({
      link: httpLink.create({ uri: 'https://api.github.com/graphql/' }),
      cache: new InMemoryCache()
    });
  }
}

