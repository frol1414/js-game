'use strict';
//https://github.com/netology-code/js-game
class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    if (!(vector instanceof Vector)) {
			throw new Error('Можно прибавлять к вектору только вектор типа Vector');
		}
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  times(factor) {
    return new Vector(this.x * factor, this.y * factor);
  }
}
// --------------------------------Движущийся объект на поле--------------------
class Actor {
  /* Конструктор
		Принимает три аргумента:
			расположение, объект типа Vector,
			размер, тоже объект типа Vector
			и скорость, тоже объект типа Vector.
		Все аргументы необязательные. По умолчанию создается объект с координатами 0:0, размером 1x1 и скоростью 0:0.
		Если в качестве первого, второго или третьего аргумента передать не объект типа Vector,
		то конструктор должен бросить исключение.*/
  constructor(pos, size, speed) {
    if (!pos) {
			pos = new Vector(0, 0);
		}
		if (!size) {
			size = new Vector(1, 1);
		}
		if (!speed) {
			speed = new Vector(0, 0);
		}
		if (!(pos instanceof Vector)) {
			throw new Error('pos не является объектом типа Vector');
		}
		if (!(size instanceof Vector)) {
			throw new Error('size не является объектом типа Vector');
		}
		if (!(speed instanceof Vector)) {
			throw new Error('speed не является объектом типа Vector');
		}
    this.pos = pos;
    this.size = size;
    this.speed = speed;
  };

  act() {} // Метод, который ничего не делает, как депутат )

  // Должны быть определены свойства только для чтения left, top, right, bottom,
  // в которых установлены границы объекта по осям X и Y с учетом его расположения и размера.

  get left() {
    return this.pos.x;
  }

  get top() {
    return this.pos.y;
  }

  get right() {
    return this.pos.x + this.size.x;
  }

  get bottom() {
    return this.pos.y + this.siza.y;
  }

  get type(){
    return actor;
  }

  /*Метод проверяет, пересекается ли текущий объект с переданным объектом, и если да, возвращает true, иначе false.

Принимает один аргумент — движущийся объект типа Actor. Если передать аргумент другого типа или вызвать без аргументов, то метод бросает исключение.

Если передать в качестве аргумента этот же объект, то всегда возвращает false. Объект не пересекается сам с собой.

Объекты, имеющие смежные границы, не пересекаются.*/

isIntersect(actor) {
  if(!actor || !(actor instanceof Actor)){
    throw new Error('Объект не типа Actor');
  }
  if(actor === this) {
    return false;
  }
  return this.left < actor.right && this.right > actor.left && this.top < actor.bottom && this.bottom > actor.top;
}
};
//----------------------------------------------------
class Level {
/*Конструктор

Принимает два аргумента: сетку игрового поля с препятствиями, массив массивов строк, и список движущихся объектов, массив объектов Actor. Оба аргумента необязательные.

Свойства

Имеет свойство grid — сетку игрового поля. Двумерный массив строк.

Имеет свойство actors — список движущихся объектов игрового поля, массив объектов Actor.

Имеет свойство player — движущийся объект, тип которого — свойство type — равно player.

Имеет свойство height — высоту игрового поля, равное числу строк в сетке из первого аргмента.

Имеет свойство width — ширину игрового поля, равное числу ячеек в строке сетки из первого аргумента. При этом, если в разных строках разное число ячеек, то width будет равно максимальному количеству ячеек в строке.

Имеет свойство status — состояние прохождения уровня, равное null после создания.

Имеет свойство finishDelay — таймаут после окончания игры, равен 1 после создания. Необходим, чтобы после выигрыша или проигрыша игра не завершалась мнгновенно.*/
constructor(grid = [], actors = []) {
  this.grid = (grid === undefined) ? [] : grid;
  this.actors = actors;
  this.player =
  this.height = this.grid.lenght;
}
}
