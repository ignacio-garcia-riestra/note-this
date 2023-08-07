#!/bin/bash

cd frontend

npm run app &
sleep 6 && firefox http://localhost:3000
