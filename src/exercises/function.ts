class Stack<T> {
  private data: T[];
  constructor() {
    this.data = [];
  }

  push(item: T) {
    this.data.push(item);
  }

  pop(): T | undefined {
    return this.data.pop();
  }
}

let stringStack = new Stack<string>();
stringStack.push("a");
stringStack.push("b");
stringStack.push("c");
// console.log(stringStack.pop());

const myMap = <T, U>(
  arr: T[],
  callback: (item: T, index: number, array: T[]) => U
): U[] => {
  const result: U[] = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
};

const arr = ["Phuong", "Tu", "Khiem"];
const newArr = myMap<string, string>(arr, (item) => item + " - CPL FE");
console.log(newArr);
const numbers: number[] = [10, 20, 30, 40];
const newNumbers: string[] = myMap<number, string>(numbers, (item) =>
  item.toString()
);
console.log(newNumbers);

// 1. Data Types, Type Annotation, Type Assertion
// 1.1
// let age: number = "25";
// let isActive: boolean = "true";
// let data: any = { x: 10 };
// data = "hello";
let age: number = 25;
let isActive: boolean = true;
let data: any = { x: 10 };
data = "hello";

// 1.2
// Định nghĩa biến 'user' với các type sau bằng type annotation:
// - name (string, bắt buộc)
// - age (number, optional)
// - roles: tuple gồm 2 thanh phan string va number
type user = {
  name: string;
  age?: number;
  roles: [string | number];
};

// 1.3
// Sử dụng type assertion để fix lỗi
const input = document.getElementById("input") as HTMLInputElement;
const value = Number(input.value); // Giá trị value là number

// 1.4
// Khi nào dùng 'unknown' thay cho 'any'? Viết ví dụ minh họa.

// Dùng **unknown** khi bạn muốn giữ tính an toàn kiểu
function handleData(data: unknown) {
  if (typeof data === "string") {
    console.log(data.toUpperCase());
  } else {
    console.log("Không phải chuỗi");
  }
}
handleData(123);
handleData("hello"); // "HELLO"

// Dùng **any** khi bạn muốn tắt mọi kiểm tra kiểu
function handleData2(data: any) {
  console.log(data.toUpperCase());
}
handleData(123); // Runtime Error

// 2. Function
// 2.1
const sum = (a: number, b: number = 10): number => {
  return a + b;
};
sum(10);

// 2.2
// Sử dụng rest parameter để viết hàm 'mergeStrings' nhận nhiều chuỗi, trả về chuỗi đã
const mergeStrings = (...arr: string[]): string => {
  return arr.join(" ");
};

// 2.3
// Overload hàm 'getValue' để xử lý 2 trường hợp:
// - Nếu đầu vào là string, trả về string uppercase
// - Nếu đầu vào là number, trả về số * 2
function getValue(input: string): string;
function getValue(input: number): number;
function getValue(input: string | number): string | number {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else {
    return input * 2;
  }
}

// 2.4
// Tim hieu ve generic va ung dung
// Sử dụng generic để viết hàm 'filterArray' lọc các phần tử theo điều kiện
function filterArray<T>(arr: T[], condition: (item: T) => boolean): T[] {
  // Triển khai logic
  let result: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (condition(arr[i])) {
      result.push(arr[i]);
    }
  }

  return result;
}

// 3. Interface và Type
// 3.1
interface Car {
  readonly brand: string;
  speed: number;
  start(): void;
}

// 3.2
// Tạo type 'Person' và 'Employee' kế thừa Person, thêm thuộc tính 'employeeId'
type Person = { name: string };
type Employee = Person & {
  employeeId: string;
};

// 3.3
// Sử dụng index signature để định nghĩa type 'Dictionary' cho object có key là string,
type Dictionary = {
  [key: string]: string;
};

// 3.4
type OptionalFields<T> = {
  [K in keyof T]?: T[K];
};

// 4. Classes và OOP
// 4.1
class Animal {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): void {
    console.log(`Name: ${this.name}`);
  }
}

// 4.2
// Tạo class 'Cat' kế thừa 'Animal', override method 'speak()' để in "Meow"
class Cat extends Animal {
  override speak(): void {
    console.log("Meow");
  }
}

// 4.3
// Tạo abstract class 'Shape' với abstract method 'area()', sau đó triển khai cho class
abstract class Shape {
  abstract area(): number;
}

// 4.4
// Sử dụng getter/setter để validate giá trị age (0 < age < 120) trong class 'Person'
class Personn {
  private _age: number = 0;

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value > 0 && value < 120) {
      this._age = value;
    } else {
      throw new Error("Age must be between 1 and 119.");
    }
  }
}
