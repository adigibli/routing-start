
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
              private serversService: ServersService,
              private router: ActivatedRoute,
              private route: Router
  ) { }

  ngOnInit() {
    console.log(this.router.snapshot.queryParams);
    console.log(this.router.snapshot.fragment);
    this.router.queryParams
      .subscribe(
        (queryParam: Params) => {
          this.allowEdit = queryParam['allowEdit'] === '1' ? true : false;
        }
      );
    this.router.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(
      this.server.id,
      {name: this.serverName, status: this.serverStatus}
      );

    this.changesSaved = true;

    this.route.navigate(['../'], {relativeTo: this.router});
  }

}
