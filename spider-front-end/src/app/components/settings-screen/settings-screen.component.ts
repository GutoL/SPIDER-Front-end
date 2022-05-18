import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SystemConfigService } from '../../services/system-config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-screen',
  templateUrl: './settings-screen.component.html',
  styleUrls: ['./settings-screen.component.css']
})
export class SettingsScreenComponent implements OnInit {

  form_settings: FormGroup;

  constructor(private _formBuilder: FormBuilder, private router: Router, private config: SystemConfigService) { }

  ngOnInit(): void {
    this.form_settings = this._formBuilder.group({
      server_ip: this.config.server_ip,
      server_port: this.config.server_port
    })
  }

  onSubmit(): void{

    this.config.set_server_ip(this.form_settings.get('server_ip')?.value);
    this.config.set_server_port(this.form_settings.get('server_port')?.value);

    this.router.navigate(['/home']);

  }
}
