#!/bin/bash

http localhost:3000

http localhost:3000/foods
http localhost:3000/foods/new
http localhost:3000/foods/2
http localhost:3000/foods/2/edit
http -f POST localhost:3000/foods
http PUT localhost:3000/foods/2
http DELETE localhost:3000/foods/2
