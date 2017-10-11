'use strict';


//https://github.com/netology-code/js-game

/*Необходимо реализовать класс Vector, который позволит контролировать расположение объектов в двухмерном пространстве и управлять их размером и перемещением.

Конструктор
Принимает два аргумента — координаты по оси X и по оси Y, числа, по умолчанию 0.
Создает объект со свойствами x и y, равными переданным в конструктор координатам.*/

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
/*Метод plus
Принимает один аргумент — вектор, объект Vector.
Если передать аргумент другого типа, то бросает исключение Можно прибавлять к вектору только вектор типа Vector.
Создает и возвращает новый объект типа Vector, координаты которого будут суммой соответствующих координат суммируемых векторов.*/

  plus(vector) {
    if (!(vector instanceof Vector)) {
			throw new Error('"Необходим вектор типа Vector"');
		}
    return new Vector(this.x + vector.x, this.y + vector.y);
  }
/*Метод times
Принимает один аргумент — множитель, число.
Создает и возвращает новый объект типа Vector, координаты которого будут равны соответствующим координатам исходного вектора, умноженным на множитель.*/

  times(factor) {
    return new Vector(this.x * factor, this.y * factor);
  }
}
// --------------------------------Движущийся объект на поле--------------------
/*Необходимо реализовать класс Actor, который позволит контролировать все движущиеся объекты на игровом поле и контролировать их пересечение.*/
class Actor {
/*  Конструктор
Принимает три аргумента: расположение, объект типа Vector, размер, тоже объект типа Vector и скорость, тоже объект типа Vector. Все аргументы необязательные. По умолчанию создается объект с координатами 0:0, размером 1x1 и скоростью 0:0.
Если в качестве первого, второго или третьего аргумента передать не объект типа Vector, то конструктор должен бросить исключение.

Свойства
Должно быть определено свойство pos, в котором размещен Vector.
Должно быть определено свойство size, в котором размещен Vector.
Должно быть определено свойство speed, в котором размещен Vector.
Должен быть определен метод act, который ничего не делает.
Должны быть определены свойства только для чтения left, top, right, bottom, в которых установлены границы объекта по осям X и Y с учетом его расположения и размера.
Должен иметь свойство type — строку со значением actor, только для чтения.*/

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

  }

  act() {} // Метод, который ничего не делает, как депутат )

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
    return this.pos.y + this.size.y;
  }

  get type() {
		return 'actor';
	}


/*Метод проверяет, пересекается ли текущий объект с переданным объектом, и если да, возвращает true, иначе false.
Принимает один аргумент — движущийся объект типа Actor. Если передать аргумент другого типа или вызвать без аргументов, то метод бросает исключение.
Если передать в качестве аргумента этот же объект, то всегда возвращает false. Объект не пересекается сам с собой.
Объекты, имеющие смежные границы, не пересекаются.*/

isIntersect(actor) {
  if (actor instanceof Actor) {
      if (this === actor) return false;
      let leftRight = actor.left === this.left && actor.right === this.right;
      let topBottom = actor.top === this.top && actor.bottom === this.bottom;
      let planeX = (actor.left < this.left && this.left < actor.right) || (this.left < actor.left && actor.left < this.right);
      let planeY = (actor.top < this.top && this.top < actor.bottom) || (this.top < actor.top && actor.top < this.bottom);
      return (planeX && planeY) || (planeX && topBottom) || (planeY && leftRight) || (leftRight && topBottom);
    } else {
      throw new Error("Необходим объект типа Actor");
    }
}
}
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
  this.player = this.actors.find(actor => actor.type === 'player');

//  this.height = this.grid.lenght;
  //this.width =
  this.status = null;
  this.finishDelay = 1;

}

get height() {
  return this.grid.length;
}

get width(){
  return this.grid.reduce(function(prev, curr) {
    return curr.length > prev ? curr.length : prev;
  }, 0);
}
/*Метод isFinished
Определяет, завершен ли уровень. Не принимает аргументов.
Возвращает true, если свойство status не равно null и finishDelay меньше нуля.*/

isFinished() {
  return (this.status !== null && this.finishDelay < 0);
}

/*Метод actorAt
Определяет, расположен ли какой-то другой движущийся объект в переданной позиции, и если да, вернёт этот объект.
Принимает один аргумент — движущийся объект, Actor. Если не передать аргумент или передать не объект Actor, метод должен бросить исключение.
Возвращает undefined, если переданный движущийся объект не пересекается ни с одним объектом на игровом поле.
Возвращает объект Actor, если переданный объект пересекается с ним на игровом поле. Если пересекается с несколькими объектами, вернет первый.*/

actorAt(actor){
  if (!(actor instanceof Actor) || actor === undefined) {
    throw new Error("Необходим объект типа Actor");
  }
  return this.actors.find((key) => key.isIntersect(actor));
}

/*Метод obstacleAt
Аналогично методу actorAt определяет, нет ли препятствия в указанном месте. Также этот метод контролирует выход объекта за границы игрового поля.
Так как движущиеся объекты не могут двигаться сквозь стены, то метод принимает два аргумента: положение, куда собираемся передвинуть объект, вектор Vector, и размер этого объекта, тоже вектор Vector. Если первым и вторым аргументом передать не Vector, то метод бросает исключение.
Вернет строку, соответствующую препятствию из сетки игрового поля, пересекающему область, описанную двумя переданными векторами, либо undefined, если в этой области препятствий нет.
Если описанная двумя векторами область выходит за пределы игрового поля, то метод вернет строку lava, если область выступает снизу. И вернет wall в остальных случаях. Будем считать, что игровое поле слева, сверху и справа огорожено стеной и снизу у него смертельная лава.*/

obstacleAt(position, size) {
  if (!(position instanceof Vector) && !(size instanceof Vector)) throw new Error("Что-то не является вектором!");
    let actor = new Actor(position, size);
    let level = new Actor(new Vector(), new Vector(this.width, this.height));
    if (actor.bottom > level.bottom) return "lava";
    if (actor.left < level.left || actor.right > level.right || actor.top < level.top) return "wall";
    for (let row = Math.floor(actor.top); row < Math.ceil(actor.bottom); row++)
      for (let col = Math.floor(actor.left); col < Math.ceil(actor.right); col++) {
        if (this.grid[row][col] === undefined) continue;
        if (this.grid[row][col] === "lava") return "lava";
        if (this.grid[row][col] === "wall") return "wall";
      }
    return undefined;

}

/*Метод removeActor
Метод удаляет переданный объект с игрового поля. Если такого объекта на игровом поле нет, не делает ничего.
Принимает один аргумент, объект Actor. Находит и удаляет его.*/

removeActor(actor) {
  if (!actor || !(actor instanceof Actor)) {
    return;
  }
  for (let i = 0; i < this.actors.length; i++){
    if (this.actors[i] == actor) {
      return this.actors.splice(i, 1);
    }
  }
}

/*Метод noMoreActors
Определяет, остались ли еще объекты переданного типа на игровом поле.
Принимает один аргумент — тип движущегося объекта, строка.
Возвращает true, если на игровом поле нет объектов этого типа (свойство type). Иначе возвращает false.*/

noMoreActors(type) {
  return this.actors.findIndex((value) => value.type == type) == -1;
}

/*Метод playerTouched
Один из ключевых методов, определяющий логику игры. Меняет состояние игрового поля при касании игроком каких-либо объектов или препятствий.
Если состояние игры уже отлично от null, то не делаем ничего, игра уже и так завершилась.
Принимает два аргумента. Тип препятствия или объекта, строка. Движущийся объект, которого коснулся игрок, — объект типа Actor, необязательный аргумент.
Если первым аргументом передать строку lava или fireball, то меняем статус игры на lost (свойство status). Игрок проигрывает при касании лавы или шаровой молнии.
Если первым аргументом передать строку coin, а вторым — объект монеты, то необходимо удалить эту монету с игрового поля. Если при этом на игровом поле не осталось больше монет, то меняем статус игры на won. Игрок побеждает, когда собирает все монеты на уровне. Отсюда вытекает факт, что уровень без монет пройти невозможно.*/

playerTouched(type, actor){
  if (this.status !== null) return; //Если состояние игры уже отлично от null, то не делаем ничего, игра уже и так завершилась.
  if (type === 'lava' || type === 'fireball') {
    this.status ='lost';
  }
  if (type === 'coin') {
    this.removeActor(actor);
    if (this.noMoreActors('coin')) {
      this.status = 'won';
    }
  }
}

}
/*Объект класса LevelParser позволяет создать игровое поле Level из массива строк по следующему принципу:

Каждый элемент массива соответствует строке в сетке уровня.
Каждый символ строки соответствует ячейке в сетке уровня.
Символ определяет тип объекта или препятствия.
Индекс строки и индекс символа определяют исходные координаты объекта или координаты препятствия.
Символы и соответствующие им препятствия и объекты игрового поля:

x — стена, препятствие
! — лава, препятствие
@ — игрок, объект
o — монетка, объект
= — движущаяся горизонтально шаровая молния, объект
| — движущаяся вертикально шаровая молния, объект
v — огненный дождь, объект
Обратите внимание, что тут слово «символ» означает букву, цифру или знак, которые используются в строках, а не тип данных Symbol.
Конструктор
Принимает один аргумент — словарь движущихся объектов игрового поля, объект, ключами которого являются символы из текстового представления уровня, а значениями — конструкторы, с помощью которых можно создать новый объект.*/

class LevelParser {

  constructor(dictionary) {
    this.dictionary = dictionary;
  }

/*Метод actorFromSymbol
Принимает символ, строка. Возвращает конструктор объекта по его символу, используя словарь. Если в словаре не нашлось ключа с таким символом, вернет undefined.*/

actorFromSymbol(symbol) {
  if (symbol === undefined){
    return undefined;
  }
  return this.dictionary[symbol];
}
/*Метод obstacleFromSymbol
Аналогично принимает символ, строка. Возвращает строку, соответствующую символу препятствия. Если символу нет соответствующего препятствия, то вернет undefined.
Вернет wall, если передать x.
Вернет lava, если передать !.
Вернет undefined, если передать любой другой символ.*/

obstacleFromSymbol(symbol) {
  if (symbol === "x") {
     return "wall";
   } else if (symbol === "!") {
     return "lava";
   }
}
/*Метод createGrid
Принимает массив строк и преобразует его в массив массивов, в ячейках которого хранится либо строка, соответствующая препятствию, либо undefined.
Движущиеся объекты не должны присутствовать на сетке.*/


createGrid(arrayOfStrings) {
  if (arrayOfStrings.length < 1) return [];
    let grid = [], row;
    for (let string of arrayOfStrings) {
      row = [];
      for (let key of string)
        row.push(this.obstacleFromSymbol(key));
      grid.push(row);
    }
    return grid;
  }

/*Метод createActors
Принимает массив строк и преобразует его в массив движущихся объектов, используя для их создания конструкторы из словаря.
Количество движущихся объектов в результирующем массиве должно быть равно количеству символов объектов в массиве строк.
Каждый объект должен быть создан с использованием вектора, определяющего его положение с учетом координат, полученных на основе индекса строки в массиве (Y) и индекса символа в строке (X).
Для создания объекта должен быть использован конструктор из словаря, соответствующий символу. При этом, если этот конструктор не является экземпляром Actor, то такой символ игнорируется, и объект не создается.*/
  createActors(arrayOfStrings) {
    let actor, actors = [], char, func;
    for (let i = 0; i < arrayOfStrings.length; i++) {
      for (let r = 0; r < arrayOfStrings[i].length; r++) {
        char = arrayOfStrings[i][r];
        try {
          func = this.actorFromSymbol(char);
          actor = new func(new Vector(r, i));
          if (actor instanceof Actor) actors.push(actor);
        } catch (exception) {}
      }
    }
    return actors;
  }


/*Метод parse
Принимает массив строк, создает и возвращает игровое поле, заполненное препятствиями и движущимися объектами, полученными на основе символов и словаря.*/
  parse(arrayOfStrings) {
  return new Level(this.createGrid(arrayOfStrings), this.createActors(arrayOfStrings));
  }
}

/*Шаровая молния
Класс Fireball станет прототипом для движущихся опасностей на игровом поле. Он должен наследовать весь функционал движущегося объекта Actor.

Конструктор
Принимает два аргумента: координаты, объект Vector и скорость, тоже объект Vector. Оба аргумента необязательные. По умолчанию создается объект с координатами 0:0 и скоростью 0:0.

Свойства
Созданный объект должен иметь свойство type со значением fireball. Это свойство только для чтения.
Также должен иметь размер 1:1 в свойстве size, объект Vector.*/

class Fireball extends Actor {
  constructor(position = new Vector(), speed = new Vector()) {
    super(position, new Vector(1, 1), speed);
    Object.defineProperty(this, "type", {configurable: true, value: "fireball", writeble: false});
  }

/*Метод getNextPosition
Создает и возвращает вектор Vector следующей позиции шаровой молнии. Это функция времени. И как в школьной задаче, новая позиция — это текущая позиция плюс скорость, умноженная на время. И так по каждой из осей.
Принимает один аргумент, время, число. Аргумент необязательный, по умолчанию равен 1.*/

  getNextPosition(time = 1) {
    return new Vector(this.pos.x + this.speed.x * time, this.pos.y + this.speed.y * time);
  }

/*Метод handleObstacle
Обрабатывает столкновение молнии с препятствием. Не принимает аргументов. Ничего не возвращает.
Меняет вектор скорости на противоположный. Если он был 5:5, то после должен стать -5:-5.*/

handleObstacle(){
  this.speed = new Vector(-this.speed.x, -this.speed.y)
}

/*Метод act
Обновляет состояние движущегося объекта.
Принимает два аргумента. Первый — время, число, второй — игровое поле, объект Level.
Метод ничего не возвращает. Но должен выполнить следующие действия:
Получить следующую позицию, используя время.
Выяснить, не пересечется ли в следующей позиции объект с каким-либо препятствием. Пересечения с другими движущимися объектами учитывать не нужно.
Если нет, обновить текущую позицию объекта.
Если объект пересекается с препятствием, то необходимо обработать это событие. При этом текущее положение остается прежним.
Пример использования

const time = 5;
const speed = new Vector(1, 0);
const position = new Vector(5, 5);

const ball = new Fireball(position, speed);

const nextPosition = ball.getNextPosition(time);
console.log(`Новая позиция: ${nextPosition.x}: ${nextPosition.y}`);

ball.handleObstacle();
console.log(`Текущая скорость: ${ball.speed.x}: ${ball.speed.y}`);
Результат работы кода:

Новая позиция: 10: 5
Текущая скорость: -1: 0*/

act(time, level) {
    let nextPosition = this.getNextPosition(time);
    if (level.obstacleAt(nextPosition, this.size))
      this.handleObstacle();
    else
      this.pos = nextPosition;
  }

}
/*Горизонтальная шаровая молния
Вам необходимо самостоятельно реализовать класс HorizontalFireball. Он будет представлять собой объект, который движется по горизонтали со скоростью 2 и при столкновении с препятствием движется в обратную сторону.
Конструктор должен принимать один аргумент — координаты текущего положения, объект Vector. И создавать объект размером 1:1 и скоростью, равной 2 по оси X.*/

class HorizontalFireball extends Fireball {
  constructor(position = new Vector(), speed = new Vector(2, 0)) {
    super(position, speed);
  }
}

/*Вертикальная шаровая молния
Вам необходимо самостоятельно реализовать класс VerticalFireball. Он будет представлять собой объект, который движется по вертикали со скоростью 2 и при столкновении с препятствием движется в обратную сторону.
Конструктор должен принимать один аргумент: координаты текущего положения, объект Vector. И создавать объект размером 1:1 и скоростью, равной 2 по оси Y.*/

class VerticalFireball extends Fireball {
  constructor(position = new Vector(), speed = new Vector(0, 2)) {
    super(position, speed);
  }
}

/*Огненный дождь
Вам необходимо самостоятельно реализовать класс FireRain. Он будет представлять собой объект, который движется по вертикали со скоростью 3 и при столкновении с препятствием начинает движение в том же направлении из исходного положения, которое задано при создании.
Конструктор должен принимать один аргумент — координаты текущего положения, объект Vector. И создавать объект размером 1:1 и скоростью, равной 3 по оси Y.*/

class FireRain extends Fireball {
  constructor(pos) {
    let speed = new Vector(0,3);
    super(pos, speed);
    this.startPos = pos;
  }

  handleObstacle() {
    this.pos = this.startPos;
  }
}

/*Монета

Класс Coin реализует поведение монетки на игровом поле. Чтобы привлекать к себе внимание, монетки должны постоянно подпрыгивать в рамках своей ячейки. Класс должен наследовать весь функционал движущегося объекта Actor.

Конструктор
Принимает один аргумент — координаты положения на игровом поле, объект Vector.
Созданный объект должен иметь размер 0,6:0,6. А его реальные координаты должны отличаться от тех, что переданы в конструктор, на вектор 0,2:0,1.

Свойства
Свойство type созданного объекта должно иметь значение coin.
Также объект должен иметь следующие свойства:
Скорость подпрыгивания, springSpeed, равная 8;
Радиус подпрыгивания, springDist, равен 0.07;
Фаза подпрыгивания, spring, случайное число от 0 до 2π.*/
class Coin extends Actor {
  constructor(position = new Vector()) {
    super(new Vector(position.x + 0.2, position.y + 0.1), new Vector(0.6, 0.6));
    Object.defineProperty(this, "type", {configurable: true, value: "coin", writable: false});
    Object.defineProperty(this, "type", {configurable: true, get : () => "coin" });

    this.springSpeed = 8;
    this.springDist = 0.07;
    this.spring = 2 * Math.PI * Math.random();
  }
/*Метод updateSpring
Обновляет фазу подпрыгивания. Это функция времени.
Принимает один аргумент — время, число, по умолчанию 1.
Ничего не возвращает. Обновляет текущую фазу spring, увеличив её на скорость springSpeed, умноженную на время.*/

updateSpring(time = 1) {
    this.spring += this.springSpeed * time;
  }

/*Метод getSpringVector
Создает и возвращает вектор подпрыгивания. Не принимает аргументов.
Так как подпрыгивание происходит только по оси Y, то координата X вектора всегда равна нулю.
Координата Y вектора равна синусу текущей фазы, умноженному на радиус.*/

getSpringVector() {
    return new Vector(0, Math.sin(this.spring) * this.springDist);
  }

/*Метод getNextPosition
Обновляет текущую фазу, создает и возвращает вектор новой позиции монетки.
Принимает один аргумент — время, число, по умолчанию 1.
Новый вектор равен базовому вектору положения, увеличенному на вектор подпрыгивания. Увеличивать нужно именно базовый вектор положения, который получен в конструкторе, а не текущий.*/
getNextPosition(time) {
    this.updateSpring(time);
    return this.pos.plus(this.getSpringVector());
}

/*Метод act
Принимает один аргумент — время. Получает новую позицию объекта и задает её как текущую. Ничего не возвращает.*/

act(time) {
    this.pos = this.getNextPosition(time);
 }
  
}


/*Игрок
Класс Player содержит базовый функционал движущегося объекта, который представляет игрока на игровом поле. Должен наследовать возможности Actor.

Конструктор
Принимает один аргумент — координаты положения на игровом поле, объект Vector.
Созданный объект, реальное положение которого отличается от того, что передано в конструктор, на вектор 0:-0,5. Имеет размер 0,8:1,5. И скорость 0:0.

Свойства
Имеет свойство type, равное player.*/

class Player extends Actor {

constructor(position = new Vector()) {
    super(new Vector(position.x, position.y - 0.5), new Vector(0.8, 1.5));
    Object.defineProperty(this, "type", {configurable: true, value: "player", writable: false});

  }
}

let levels = [
    [
      // "     v                 ",
      "                       ",
      "                       ",
      "                       ",
      "                       ",
      "  |xxx       w         ",
      "  o                 o  ",
      "                  = x  ",
      "  x          o o    x  ",
      "  x  @    *  xxxxx  x  ",
      "  xxxxx             x  ",
      "      x!!!!!!!!!!!!!x  ",
      "      xxxxxxxxxxxxxxx  ",
      "                       "
    ],
    [
      // "     v                 ",
      "                       ",
      "                       ",
      "                       ",
      "                       ",
      "  |                    ",
      "  o                 o  ",
      "  x  xx        =    x  ",
      "  x            o    x  ",
      "  x  @      xxxxxx  x  ",
      "  xxxxx             x  ",
      "      x!!!!!!!!!!!!!x  ",
      "      xxxxxxxxxxxxxxx  ",
      "                       "
    ],
];
const actorDict = {
  '@': Player,
  '=': HorizontalFireball,
  'v': FireRain,
  '|': VerticalFireball,
  'o': Coin
};
const parser = new LevelParser(actorDict);
runGame(levels, parser, DOMDisplay)
  .then(() => alert('Вы выиграли приз!'));


const grid = [
  new Array(3),
  ['wall', 'wall', 'lava']
];
const level = new Level(grid);
runLevel(level, DOMDisplay);

