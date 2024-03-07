export namespace errorsx {
	
	export class FormattedError {
	    code?: number;
	    message: any;
	
	    static createFrom(source: any = {}) {
	        return new FormattedError(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.code = source["code"];
	        this.message = source["message"];
	    }
	}

}

export namespace model {
	
	export class AddRoleForUser {
	    dbName: string;
	    userName: string;
	    role: string;
	
	    static createFrom(source: any = {}) {
	        return new AddRoleForUser(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dbName = source["dbName"];
	        this.userName = source["userName"];
	        this.role = source["role"];
	    }
	}
	export class DatabaseFileDetail {
	    logicalName: string;
	    fileName: string;
	    sizeMB: number;
	    maxSizeMB: number;
	
	    static createFrom(source: any = {}) {
	        return new DatabaseFileDetail(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.logicalName = source["logicalName"];
	        this.fileName = source["fileName"];
	        this.sizeMB = source["sizeMB"];
	        this.maxSizeMB = source["maxSizeMB"];
	    }
	}
	export class CreateDatabase {
	    dbName: string;
	    isDefault: boolean;
	    dbFiles?: DatabaseFileDetail[];
	
	    static createFrom(source: any = {}) {
	        return new CreateDatabase(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dbName = source["dbName"];
	        this.isDefault = source["isDefault"];
	        this.dbFiles = this.convertValues(source["dbFiles"], DatabaseFileDetail);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class TableColumnReq {
	    columnName: string;
	    dataType: string;
	    maxLength?: number;
	    isNullable?: string;
	    defaultValue: string;
	    isIdentity: string;
	    isPrimaryKey: string;
	
	    static createFrom(source: any = {}) {
	        return new TableColumnReq(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.columnName = source["columnName"];
	        this.dataType = source["dataType"];
	        this.maxLength = source["maxLength"];
	        this.isNullable = source["isNullable"];
	        this.defaultValue = source["defaultValue"];
	        this.isIdentity = source["isIdentity"];
	        this.isPrimaryKey = source["isPrimaryKey"];
	    }
	}
	export class CreateTableReq {
	    dbName: string;
	    tableName: string;
	    columns?: TableColumnReq[];
	
	    static createFrom(source: any = {}) {
	        return new CreateTableReq(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dbName = source["dbName"];
	        this.tableName = source["tableName"];
	        this.columns = this.convertValues(source["columns"], TableColumnReq);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class CreateUserForLogin {
	    dbName: string;
	    userName: string;
	    loginName: string;
	    roles: string[];
	
	    static createFrom(source: any = {}) {
	        return new CreateUserForLogin(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dbName = source["dbName"];
	        this.userName = source["userName"];
	        this.loginName = source["loginName"];
	        this.roles = source["roles"];
	    }
	}
	
	export class KeyValue {
	    key: string;
	    value: any;
	
	    static createFrom(source: any = {}) {
	        return new KeyValue(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.key = source["key"];
	        this.value = source["value"];
	    }
	}
	export class DatabaseRes {
	    id: number;
	    engineId: number;
	    name: string;
	    isDefault: boolean;
	    dataOpt: KeyValue[];
	    logOpt: KeyValue[];
	
	    static createFrom(source: any = {}) {
	        return new DatabaseRes(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.engineId = source["engineId"];
	        this.name = source["name"];
	        this.isDefault = source["isDefault"];
	        this.dataOpt = this.convertValues(source["dataOpt"], KeyValue);
	        this.logOpt = this.convertValues(source["logOpt"], KeyValue);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DropRoleForUser {
	    dbName: string;
	    userName: string;
	    role: string;
	
	    static createFrom(source: any = {}) {
	        return new DropRoleForUser(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dbName = source["dbName"];
	        this.userName = source["userName"];
	        this.role = source["role"];
	    }
	}
	export class DropTable {
	    dbName: string;
	    tableName: string;
	
	    static createFrom(source: any = {}) {
	        return new DropTable(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dbName = source["dbName"];
	        this.tableName = source["tableName"];
	    }
	}
	export class DropUser {
	    dbName: string;
	    userName: string;
	
	    static createFrom(source: any = {}) {
	        return new DropUser(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dbName = source["dbName"];
	        this.userName = source["userName"];
	    }
	}
	export class User {
	    id: number;
	    engineId: number;
	    name: string;
	    password: string;
	    isSA: boolean;
	
	    static createFrom(source: any = {}) {
	        return new User(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.engineId = source["engineId"];
	        this.name = source["name"];
	        this.password = source["password"];
	        this.isSA = source["isSA"];
	    }
	}
	export class Engine {
	    id: number;
	    server: string;
	    users: User[];
	    port: number;
	
	    static createFrom(source: any = {}) {
	        return new Engine(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.server = source["server"];
	        this.users = this.convertValues(source["users"], User);
	        this.port = source["port"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class GetAll {
	    dbName: string;
	    tableName: string;
	
	    static createFrom(source: any = {}) {
	        return new GetAll(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dbName = source["dbName"];
	        this.tableName = source["tableName"];
	    }
	}
	export class GuiConfig {
	    locale: string;
	    sidebarMinized: boolean;
	
	    static createFrom(source: any = {}) {
	        return new GuiConfig(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.locale = source["locale"];
	        this.sidebarMinized = source["sidebarMinized"];
	    }
	}
	export class Login {
	    loginName: string;
	    password: string;
	    isSysAdmin: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Login(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.loginName = source["loginName"];
	        this.password = source["password"];
	        this.isSysAdmin = source["isSysAdmin"];
	    }
	}
	export class RowTable {
	    values: {[key: string]: any};
	
	    static createFrom(source: any = {}) {
	        return new RowTable(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.values = source["values"];
	    }
	}
	export class TableColumn {
	    columnName: string;
	    dataType: string;
	    // Go type: sql
	    maxLength: any;
	    isNullable: string;
	    // Go type: sql
	    defaultValue: any;
	    isIdentity: string;
	    isPrimaryKey: string;
	
	    static createFrom(source: any = {}) {
	        return new TableColumn(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.columnName = source["columnName"];
	        this.dataType = source["dataType"];
	        this.maxLength = this.convertValues(source["maxLength"], null);
	        this.isNullable = source["isNullable"];
	        this.defaultValue = this.convertValues(source["defaultValue"], null);
	        this.isIdentity = source["isIdentity"];
	        this.isPrimaryKey = source["isPrimaryKey"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class TrackingState {
	    cfn: string;
	    userCode: string;
	    lp: number;
	    lpGain: number;
	    mr: number;
	    mrGain: number;
	    wins: number;
	    totalWins: number;
	    totalLosses: number;
	    totalMatches: number;
	    losses: number;
	    winRate: number;
	    character: string;
	    opponent: string;
	    opponentCharacter: string;
	    opponentLP: number;
	    opponentLeague: string;
	    result: boolean;
	    timestamp: string;
	    date: string;
	    winStreak: number;
	
	    static createFrom(source: any = {}) {
	        return new TrackingState(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.cfn = source["cfn"];
	        this.userCode = source["userCode"];
	        this.lp = source["lp"];
	        this.lpGain = source["lpGain"];
	        this.mr = source["mr"];
	        this.mrGain = source["mrGain"];
	        this.wins = source["wins"];
	        this.totalWins = source["totalWins"];
	        this.totalLosses = source["totalLosses"];
	        this.totalMatches = source["totalMatches"];
	        this.losses = source["losses"];
	        this.winRate = source["winRate"];
	        this.character = source["character"];
	        this.opponent = source["opponent"];
	        this.opponentCharacter = source["opponentCharacter"];
	        this.opponentLP = source["opponentLP"];
	        this.opponentLeague = source["opponentLeague"];
	        this.result = source["result"];
	        this.timestamp = source["timestamp"];
	        this.date = source["date"];
	        this.winStreak = source["winStreak"];
	    }
	}

}

