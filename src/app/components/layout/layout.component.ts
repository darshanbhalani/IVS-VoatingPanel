import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SiteHeaderComponent } from '../site-header/site-header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,SiteHeaderComponent,FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
