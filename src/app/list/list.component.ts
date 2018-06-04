import { Component, OnInit, Query } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';

import { User } from '../types'

const CurrentUserForProfile = gql`
  query{
    viewer {
      login
    }
  }
`;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private querySubscription: Subscription;
  constructor(
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: CurrentUserForProfile
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        // this.loading = loading;
        // this.currentUser = data.currentUser;\
        console.log(data);
      });
  }

}
