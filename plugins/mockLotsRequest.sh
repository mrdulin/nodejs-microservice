#! /bin/sh

for i in {0..100000}
  do
    curl -d '{"cmd":"memory-leak", name: "mrdulin"}' http://127.0.0.1:8080/act
  done