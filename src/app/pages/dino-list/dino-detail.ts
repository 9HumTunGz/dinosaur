import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DinoService } from '../../services/dino';

@Component({
  standalone: true,
  selector: 'app-dino-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './dino-detail.html'
})
export class DinoDetail implements OnInit {
  dino = signal<any>(null);
  loading = signal(true);
  favorites = signal<string[]>(
    JSON.parse(localStorage.getItem('favorites') ?? '[]')
  );

  isFav = computed(() =>
    this.favorites().includes(this.dino()?.name)
  );

  constructor(
    private route: ActivatedRoute,
    private dinoService: DinoService
  ) {}

ngOnInit() {
  const name = this.route.snapshot.paramMap.get('name');
  this.dinoService.getAll().subscribe({
    next: (data) => {
      const found = data.find(d => d.name === name);
      this.dino.set(found ?? null);
      this.loading.set(false);
    },
    error: () => {
      this.loading.set(false);
    }
  });
}

  toggleFav() {
    const name = this.dino()?.name;
    if (!name) return;
    const current = this.favorites();
    const updated = current.includes(name)
      ? current.filter(n => n !== name)
      : [...current, name];
    this.favorites.set(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  }
}
