// "Learn the route": the step the research puts before any encoding. First a
// guided walk of the empty loci with their names, then a short quiz: "what
// stands at place 4?", answered from the loci names. Pure state.
import { shuffle } from './run.js';

export class RouteLesson {
  // `labels` are the loci names in route order; `length` how many to learn.
  constructor(labels, length, rand = Math.random) {
    this.labels = labels.slice(0, length);
    this.length = this.labels.length;
    this.rand = rand;
    this.phase = 'walk'; // walk -> quiz -> done
    this.index = 0;
    const n = Math.min(5, this.length);
    this.questions = shuffle(this.labels.map((_, i) => i), rand).slice(0, n);
    this.q = 0;
    this.right = 0;
  }

  // Walk: move to the next locus; false at the end of the route.
  next() {
    if (this.index + 1 < this.length) { this.index++; return true; }
    this.phase = 'quiz';
    return false;
  }

  get asked() { return this.questions[this.q]; }

  // Four names to choose from: the right one and three other loci on the route.
  choices() {
    const others = shuffle(this.labels.filter((_, i) => i !== this.asked), this.rand).slice(0, 3);
    return shuffle([this.labels[this.asked], ...others], this.rand);
  }

  answer(label) {
    const ok = label === this.labels[this.asked];
    if (ok) this.right++;
    return ok;
  }

  // Move to the next question; false when the quiz is over.
  nextQuestion() {
    if (this.q + 1 < this.questions.length) { this.q++; return true; }
    this.phase = 'done';
    return false;
  }

  get perfect() { return this.right === this.questions.length; }
}
