package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.PurchaseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Purchase} and its DTO {@link PurchaseDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface PurchaseMapper extends EntityMapper<PurchaseDTO, Purchase> {


    @Mapping(target = "removeProductSku", ignore = true)

    default Purchase fromId(Long id) {
        if (id == null) {
            return null;
        }
        Purchase purchase = new Purchase();
        purchase.setId(id);
        return purchase;
    }
}
