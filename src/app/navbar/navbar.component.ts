import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  avatarUrl: string | null = 'assets/images/profile_blank.png';

  constructor(
    private router: Router,
    private readonly supabase: SupabaseService
  ) {}
  
  async ngOnInit(): Promise<void> {
    //Check usser logged
    this.isLoggedIn = await this.supabase.isUserLoggedIn();
    
    //Get avatar
    this.avatarUrl = await this.supabase.profilePicture();
  }

}
