import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DinoService } from '../../services/dino';

@Component({
  standalone: true,
  selector: 'app-games',
  imports: [CommonModule],
  templateUrl: './games.html',
  styleUrl: './games.scss'
})
export class Games implements OnInit {
  allDinos = signal<any[]>([]);
  currentDino = signal<any>(null);
  options = signal<string[]>([]);
  selected = signal<string | null>(null);
  score = signal(0);
  round = signal(0);
  totalRounds = 5;
  isFinished = signal(false);

  isCorrect = computed(() =>
    this.selected() === this.currentDino()?.name
  );
  isAnswered = computed(() => this.selected() !== null);

  constructor(private dinoService: DinoService) {}

ngOnInit() {
  this.dinoService.getAll().subscribe({
    next: (data) => {
      this.allDinos.set(data);
      this.nextQuestion();
    },
    error: () => {}
  });
}

  nextQuestion() {
    if (this.round() >= this.totalRounds) {
      this.isFinished.set(true);
      return;
    }
    const list = this.allDinos();
    const correct = list[Math.floor(Math.random() * list.length)];
    const wrong = list
      .filter(d => d.name !== correct.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const opts = [...wrong, correct].sort(() => Math.random() - 0.5);
    this.currentDino.set(correct);
    this.options.set(opts.map(d => d.name));
    this.selected.set(null);
    this.round.update(r => r + 1);
  }

  select(name: string) {
    if (this.isAnswered()) return;
    this.selected.set(name);
    if (name === this.currentDino()?.name) {
      this.score.update(s => s + 1);
    }
  }

  getOptionClass(name: string): string {
    if (!this.isAnswered()) return '';
    if (name === this.currentDino()?.name) return 'correct';
    if (name === this.selected()) return 'wrong';
    return '';
  }

  restart() {
    this.score.set(0);
    this.round.set(0);
    this.isFinished.set(false);
    this.nextQuestion();
  }
}
