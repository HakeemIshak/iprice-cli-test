#!/usr/bin/env node
import { Command, Printer } from "./class/Printer";

const [,, ...args] = process.argv
new Printer(<Command>args[0], args[1])