import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {

  constructor(private readonly databaseService: DatabaseService) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getMenu(): Promise<any> {
    const rows = await this.databaseService.executeQuery(
      `SELECT m.idMenu, m.nombreMenu, m.hrefMenu, m.iconmenu, m.estadomenu, sm.nombreSubMenu, sm.hrefSubMenu, sm.iconSubMenu, sm.estadoSubMenu 
        FROM menu m 
        left join submenu sm on sm.idMenu = m.idMenu
        where m.estadomenu = true
        order by m.idMenu, sm.idSubMenu;`);

    const menuMap = new Map();

    for (const row of rows) {
      if (!menuMap.has(row.idMenu)) {
        menuMap.set(row.idMenu, {
          idMenu: row.idMenu,
          nombreMenu: row.nombreMenu,
          hrefMenu: row.hrefMenu,
          iconMenu: row.iconmenu,
          estadoMenu: row.estadomenu,
          submenu: [],
        });
      }

      if (row.nombreSubMenu && row.estadoSubMenu) {
        menuMap.get(row.idMenu).submenu.push({
          nombreSubMenu: row.nombreSubMenu,
          hrefSubMenu: row.hrefSubMenu,
          iconSubMenu: row.iconSubMenu,
          estadoSubMenu: row.estadoSubMenu,
        });
      }
    }

    return Array.from(menuMap.values()) || null;
  }
}
