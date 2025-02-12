#!/bin/bash

cd swift
swift test --filter "$1" --disable-xctest
cd ..
