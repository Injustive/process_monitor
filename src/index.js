const { spawn } = require('child_process');
const processToMonitor = 'node'; // Example process to monitor, replace with your specific command
const args = ['./your-script.js']; // Replace with your script's arguments

class SimpleProcessMonitor {
    constructor(command, args) {
        this.command = command;
        this.args = args;
        this.startProcess();
    }

    startProcess() {
        this.process = spawn(this.command, this.args);

        console.log(`Started process PID: ${this.process.pid}`);

        this.process.on('exit', (code, signal) => {
            console.log(`Process exited with code ${code} and signal ${signal}`);
            console.log('Restarting process...');
            this.startProcess();
        });

        this.monitorProcess();
    }

    monitorProcess() {
        setInterval(() => {
            const { pid } = this.process;
            process.kill(pid, 0); // Check if process is still running

            console.log(`Process PID: ${pid} is still running.`);
            // Example of logging memory usage, replace with your monitoring needs
            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

            // You can extend this with more detailed monitoring (e.g., CPU usage, thread counts, etc.)
        }, 10000); // Monitor every 10 seconds
    }
}

// Replace 'processToMonitor' and 'args' with the command and args of the process you want to monitor
new SimpleProcessMonitor(processToMonitor, args);