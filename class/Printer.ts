import { writeFile } from 'fs';

export type Command = 'help' | '--lower' | '--upper' | '--random' | '--csv';

export class Printer {
    
    private command: Command;
    private value: string;
    public result: string;

    constructor(command: Command, value: string) {

        this.command = command;
        this.value = value;
        this.result = '';

        if (!this.value && !this.command) {
            console.log(this.showHelper());
            return;
        }

        if (!this.value && this.command !== 'help') {
            console.log(`Missing value for ${command}`);
            return;
        }

        switch (this.command) {
            case 'help':
                this.result = this.showHelper();
                break;
            case '--lower':
                this.result = this.toLower(this.value);
                break;
            case '--upper':
                this.result = this.toUpper(this.value);
                break;
            case '--random':
                this.result = this.toRandom(this.value);
                break;
            case '--csv':
                this.result = this.toCSV(this.value);
                break;
            default:
                console.log(`printer: Unknown command '${this.command}'`);
                return;
        }

        // Print result
        console.log(this.result);
    }

    /**
     * Print helper
     */
    showHelper = (): string => {
        return `
        printer: simple printing tool
          Available commands:
            help        - This help screen
            --lower     - Transform string to lowercase string
            --upper     - Transform string to uppercase string
            --random    - Transform string to alternate uppercase/lowercase
            --csv       - Transform string to comma seperated characters
        `;
    }

    /**
     * Transform string to uppercase
     */
    toUpper = (value: string): string => {
        return value.toUpperCase();
    }

    /**
     * Transform string to lowercase
     */
    toLower = (value: string): string => {
        return value.toLowerCase();
    }

    /**
     * Transform string to alternate between uppercase & lowercase
     */
    toRandom = (value: string): string => {
        return value.split('').map((value, index) => index % 2 ? value.toUpperCase() : value.toLocaleLowerCase()).join('');
    }

    /**
     * Transform string to comma seperated value and print inside csv
     */
    toCSV = (value: string): string => {

        // transform value to comma seperated first
        value = value.split('').join(',');
        
        // create csv file
        writeFile('output.csv', value, (err) => {
            if (err) {
                console.log(`Failed to generate your csv: ${err}`);
            }
        })

        return "CSV created!";
    }
}