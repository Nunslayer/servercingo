import { AppThunk } from '../../hooks';
import { ConnectEngine, CreateDatabase, GetDatabases, ShutdownConnection,CreateLogin, GetLogins,CreateUser } from '@@/go/core/CommandHandler'
import { setConnectedStatus, setDbs, setIsLoading, setLgs, setLogin, setServer, shutdownConnection } from './auth.slice';
import { model } from '@@/go/models';

/* export const initMarkerPosition=(map:google.maps.Map):AppThunk=>(dispatch, getState)=>{
    const {lat, lng}=getState().places
    const marker = new google.maps.Marker({
        map,
        position: {
            lat,
            lng,
        },
        draggable: true,
        animation: google.maps.Animation.DROP,
    })
    dispatch(setMarker(marker))
} */

/* export const initInfoWindowPosition=(map:google.maps.Map):AppThunk=>(dispatch,getState)=>{
    const{markerPosition}=getState().maps
    const{street,city, lat, lng}=getState().places
    const infoWindow = new google.maps.InfoWindow({
       content: `${street}, ${city}`,
        position: { lat, lng },
    })
    dispatch(setInfoWindow(infoWindow))
    infoWindow.open(map,markerPosition)
} */

/* export const initDistritosData=(map:google.maps.Map):AppThunk=>(dispatch, getState)=>{
    const data = new google.maps.Data({
        map,
        style:{
            strokeColor: '#810FCB',
            strokeOpacity: 1.0,
            strokeWeight: 2.0,
            fillColor: 'white',
            fillOpacity: 0.1,
        }
    })
    data.loadGeoJson('./distrito_municipal_santacruz.geojson')
    dispatch(setDistritosData(data))
} */

export const connectEngine =
    (
        server: string,
        login: string,
        pass: string,
        port: number,
    ): AppThunk =>
        async (dispatch,) => {
            dispatch(setIsLoading(true))
            try {
                await ConnectEngine(server, login, pass, port)
                const res = await GetDatabases()
                dispatch(setDbs(res))
                dispatch(setServer(server))
                dispatch(setConnectedStatus(true))
                dispatch(setLogin(login))
                dispatch(setIsLoading(false))
            } catch (error) {
                console.log(error)
                dispatch(setIsLoading(false))
            }
        };
export const closeConnection =
    (
    ): AppThunk =>
        async (dispatch,) => {
            dispatch(setIsLoading(true))
            try {
                await ShutdownConnection()
                dispatch(shutdownConnection())
                dispatch(setIsLoading(false))
            } catch (error) {
                console.log(error)
                dispatch(shutdownConnection())
                dispatch(setIsLoading(false))
            }
        };
export const createDatabase =
    (
        newDb: model.CreateDatabase
    ): AppThunk =>
        async (dispatch,) => {
            dispatch(setIsLoading(true))
            try {
                await CreateDatabase(newDb)
                const res = await GetDatabases()
                dispatch(setDbs(res))
                dispatch(setIsLoading(false))
            } catch (error) {
                console.log(error)
                dispatch(setIsLoading(false))
            }
        };
export const createLogin =
    (
        newDb: model.Login
    ): AppThunk =>
        async (dispatch,) => {
            dispatch(setIsLoading(true))
            try {
                await CreateLogin(newDb)
                const res = await GetLogins()
                dispatch(setLgs(res))
                dispatch(setIsLoading(false))
            } catch (error) {
                console.log(error)
                dispatch(setIsLoading(false))
            }
        };
export const createUserForLogin =
    (
        newUser: model.CreateUserForLogin
    ): AppThunk =>
        async (dispatch,) => {
            dispatch(setIsLoading(true))
            try {
                await CreateUser(newUser)
                const res = await GetLogins()
                dispatch(setLgs(res))
                dispatch(setIsLoading(false))
            } catch (error) {
                console.log(error)
                dispatch(setIsLoading(false))
            }
        };

// export const restartFlagsOnMaps = (): AppThunk => async (dispatch, getState) => {
// 	dispatch(setShowFormAvenue(false));
// 	dispatch(setShowFormPolygon(false));
// 	dispatch(setDrawingTools(false));
// 	dispatch(setEditAvenue(false));
// 	dispatch(setEditZone(false));
// 	dispatch(setDeletePolygon(false));
// 	dispatch(selectAvenueGeofence());
// 	dispatch(selectZoneGeofence());
// };
//
// export const updateIdZones =
// 	(zones: IZonesInt[], latLng: google.maps.LatLng): AppThunk =>
// 	async (dispatch, getState) => {
// 		let idZone: string | undefined = undefined;
// 		let idAvenue: string | undefined = undefined;
// 		zones.forEach((zone) => {
// 			const result = google.maps.geometry.poly.containsLocation(latLng, zone.poly);
// 			if (result) {
// 				idZone = zone._id;
// 				zone.avenues.forEach((avenue) => {
// 					const polyAvenue = new google.maps.Polygon({
// 						paths: avenue.coordinates,
// 					});
// 					const res = google.maps.geometry.poly.containsLocation(latLng, polyAvenue);
// 					if (res) {
// 						idAvenue = avenue._id;
// 					}
// 				});
// 			}
// 		});
// 		dispatch(setIdZone({ idAvenue, idZone }));
// 	};
