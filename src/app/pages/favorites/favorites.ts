import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DinoService } from '../../services/dino';

@Component({
  standalone: true,
  selector: 'app-favorites',
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss'
})
export class Favorites implements OnInit {
  allDinos = signal<any[]>([]);
  favorites = signal<string[]>(
    JSON.parse(localStorage.getItem('favorites') ?? '[]')
  );

  favDinos = computed(() =>
    this.allDinos().filter(d => this.favorites().includes(d.name))
  );

  currentIndex = signal(0);

visibleDinos = computed(() => {
  const list = this.favDinos();
  if (list.length === 0) return [];
  if (list.length === 1) return [list[0]];
  if (list.length === 2) return [list[0], list[1]];
  const i = this.currentIndex();
  return [
    list[(i - 1 + list.length) % list.length],
    list[i],
    list[(i + 1) % list.length],
  ];
});

  constructor(private dinoService: DinoService) {}

ngOnInit() {
  this.dinoService.getAll().subscribe({
    next: (data) => {
      this.allDinos.set(data);
    },
    error: () => {}
  });
}

  prev() {
    this.currentIndex.update(i =>
      (i - 1 + this.favDinos().length) % this.favDinos().length
    );
  }

  next() {
    this.currentIndex.update(i =>
      (i + 1) % this.favDinos().length
    );
  }

  isCenter(index: number): boolean {
    return index === 1;
  }
}
