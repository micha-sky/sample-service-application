package io.github.jhipster.application.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Purchase.
 */
@Entity
@Table(name = "purchase")
public class Purchase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "product_sku")
    private Integer productSku;

    @ManyToMany
    @JoinTable(name = "purchase_product_sku",
               joinColumns = @JoinColumn(name = "purchase_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "product_sku_id", referencedColumnName = "id"))
    private Set<Product> productSkus = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public Purchase userId(Integer userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getProductSku() {
        return productSku;
    }

    public Purchase productSku(Integer productSku) {
        this.productSku = productSku;
        return this;
    }

    public void setProductSku(Integer productSku) {
        this.productSku = productSku;
    }

    public Set<Product> getProductSkus() {
        return productSkus;
    }

    public Purchase productSkus(Set<Product> products) {
        this.productSkus = products;
        return this;
    }

    public Purchase addProductSku(Product product) {
        this.productSkus.add(product);
        product.getSkus().add(this);
        return this;
    }

    public Purchase removeProductSku(Product product) {
        this.productSkus.remove(product);
        product.getSkus().remove(this);
        return this;
    }

    public void setProductSkus(Set<Product> products) {
        this.productSkus = products;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Purchase)) {
            return false;
        }
        return id != null && id.equals(((Purchase) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Purchase{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", productSku=" + getProductSku() +
            "}";
    }
}
