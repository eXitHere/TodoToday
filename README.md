## ที่มาของโปรเจค

อยากจะทำ Todo List ที่สามารถใส่เลือกได้ว่า วันนี้ หรือพรุ่งนี้จะทำอะไร !? เพราะบางทีนึกขึ้นได้ว่า อยากจะทำอะไรสักอย่างนึง แต่พอตอนเช้ามาก็ดันลืมสิ่งที่อยากทำนั้นไป

-   [ ] ระบบจะ reset ทุก ๆ วัน

### please make sure you have installed yarn on your computer

## How to

#### install

```
  yarn install
```

#### run

```
  yarn start
```

#### build

```
  yarn run build
```

#### after that

```
file will created in \dist\
```

#### note

How to run electron in wsl

1. [in wsl]: npm uninstall --save-dev electron
2. [in cmd]: npm install --save-dev electron
3. [in wsl]: call ./node_modules/electron/dist/electron.exe to execute

path of wsl (share folder)

1. use (in cmd) pushd \\wsl$\Ubuntu-20.04\home\ <= same cd
2. copy folder project to linux (if you want to use auto reload...)
