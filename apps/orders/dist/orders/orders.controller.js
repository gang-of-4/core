"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const jwt_1 = require("@nestjs/jwt");
let OrdersController = class OrdersController {
    constructor(ordersService, jwtService) {
        this.ordersService = ordersService;
        this.jwtService = jwtService;
    }
    async findAll(authorization) {
        const token = this.jwtService.decode(authorization?.split(' ')[1]);
        return await this.ordersService.findAll(token?.user?.role?.name);
    }
    async findOne(id, authorization) {
        const token = this.jwtService.decode(authorization?.split(' ')[1]);
        return await this.ordersService.findOneOrFail(id, token?.user?.role?.name);
    }
    async updateOrderStatus(id, authorization) {
        const token = this.jwtService.decode(authorization?.split(' ')[1]);
        return await this.ordersService.updateOrderStatus(id, token?.user?.role?.name);
    }
    async updateOrderItemStatus(id, itemId, authorization) {
        const token = this.jwtService.decode(authorization?.split(' ')[1]);
        return await this.ordersService.updateOrderItemStatus(id, itemId, token?.user?.role?.name);
    }
    async cancelOrder(id, authorization) {
        const token = this.jwtService.decode(authorization?.split(' ')[1]);
        return await this.ordersService.cancelOrder(id, token?.user?.role?.name);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Patch)(':id/items/:itemId/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrderItemStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancelOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)({
        path: 'orders',
        version: '1',
    }),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        jwt_1.JwtService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map