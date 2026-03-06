import { Component, signal, computed, OnInit, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DinoService } from '../../services/dino';

@Component({
  standalone: true,
  selector: 'app-dino-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dino-list.html'
})
export class DinoList implements OnInit {
  dinos = signal<any[]>([]);
  loading = signal(true);
  searchQuery = model('');
  dietFilter = model('');
  showAll = signal(false);

  filteredDinos = computed(() =>
    this.dinos().filter(d => {
      const matchName = d.name.toLowerCase().includes(this.searchQuery().toLowerCase());
      const matchDiet = this.dietFilter() === '' || d.diet?.toLowerCase().includes(this.dietFilter().toLowerCase());
      return matchName && matchDiet;
    })
  );

  constructor(private dinoService: DinoService) {}

  ngOnInit() {
    this.dinoService.getAll().subscribe({
      next: (data) => {
        this.dinos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
