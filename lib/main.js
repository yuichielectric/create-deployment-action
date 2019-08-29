"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            core.debug('Start processing');
            const token = process.env['GITHUB_TOKEN'];
            core.debug(`token: ${token}`);
            if (token == undefined) {
                return;
            }
            const octokit = new github.GitHub(token);
            const context = github.context;
            const ref = core.getInput('ref') || process.env['GITHUB_SHA'];
            core.debug(`ref: ${ref}`);
            if (ref == undefined) {
                return;
            }
            const environment = core.getInput('environment');
            const payload = Object.assign({}, context.repo, { ref: ref, required_contexts: [] });
            core.debug(JSON.stringify(payload));
            const result = yield octokit.repos.createDeployment(payload);
            core.debug(JSON.stringify(result));
            core.setOutput("deployment-id", result['id']);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
